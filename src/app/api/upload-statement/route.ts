import { NextRequest, NextResponse } from 'next/server';
import { MAX_STATEMENT_SIZE, ALLOWED_STATEMENT_TYPES } from '@/lib/statementUpload';

export async function POST(request: NextRequest) {
  try {
    // Check if WordPress API URL is configured
    if (!process.env.WP_API_URL) {
      console.error('WP_API_URL environment variable is not configured');
      return NextResponse.json({ 
        error: 'Server configuration error. Please contact support.' 
      }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const customerName = (formData.get('name') as string || '').trim();
    const phone = (formData.get('phone') as string || '').trim();
    const email = (formData.get('email') as string || '').trim();
    const provider = (formData.get('provider') as string || '').trim();

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // The questionnaire is enforced here, not just in the UI - this endpoint is
    // public, so a statement with no lead attached must be rejected outright.
    if (!customerName || !phone || !email || !provider) {
      return NextResponse.json({
        error: 'Please complete the questionnaire before sending your statement.'
      }, { status: 400 });
    }

    // Validate file size (10MB limit)
    if (file.size > MAX_STATEMENT_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 });
    }

    // Validate file type (common statement formats)
    if (!ALLOWED_STATEMENT_TYPES.includes(file.type)) {
      return NextResponse.json({
        error: 'Invalid file type. Please upload PDF, image, or Excel files.'
      }, { status: 400 });
    }

    // Create form data for WordPress API
    const wpFormData = new FormData();
    wpFormData.append('name', customerName);
    wpFormData.append('email', email);
    wpFormData.append('message', `Statement Upload Submission

Name: ${customerName}
Email: ${email}
Phone: ${phone}
Current Provider: ${provider}

This user has completed the questionnaire and uploaded a statement for review.`);
    wpFormData.append('file', file);

    // Send to WordPress backend
    try {
      const wpApiUrl = `${process.env.WP_API_URL}/wp-json/payline/v1/upload`;
      // console.log('Attempting to upload to WordPress API:', wpApiUrl);
      
      const wpResponse = await fetch(wpApiUrl, {
        method: 'POST',
        body: wpFormData,
      });

      // Check if the response is JSON before trying to parse it
      const contentType = wpResponse.headers.get('content-type');
      let wpResult: any;
      
      if (contentType && contentType.includes('application/json')) {
        wpResult = await wpResponse.json();
      } else {
        // If it's not JSON, it's likely an HTML error page
        const errorText = await wpResponse.text();
        console.error('WordPress API returned non-JSON response:', errorText.substring(0, 500));
        return NextResponse.json({ 
          error: 'WordPress API is not responding correctly. Please check if the WordPress server is running.' 
        }, { status: 500 });
      }

      if (!wpResponse.ok) {
        console.error('WordPress API error:', wpResult);
        return NextResponse.json({ 
          error: wpResult.message || 'Failed to upload to WordPress. Please try again.' 
        }, { status: 500 });
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Statement uploaded successfully',
        fileUrl: wpResult.file_url 
      });
    } catch (networkError) {
      console.error('Network error connecting to WordPress API:', networkError);
      return NextResponse.json({ 
        error: 'Unable to connect to WordPress server. Please check if the server is running on the configured URL.' 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'An unexpected error occurred. Please try again.' 
    }, { status: 500 });
  }
}