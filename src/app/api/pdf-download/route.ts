import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, provider, message, downloadUrl } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Create form data for WordPress API
    const wpFormData = new FormData();
    wpFormData.append('name', name);
    wpFormData.append('email', email);
    wpFormData.append('message', message || `PDF Download Request

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Current Provider: ${provider || 'Not provided'}
Download URL: ${downloadUrl || 'Not provided'}

This user has requested access to a PDF download.`);

    // Send to WordPress backend
    const wpResponse = await fetch(`${process.env.WP_API_URL}/wp-json/payline/v1/download`, {
      method: 'POST',
      body: wpFormData,
    });

    const wpResult = await wpResponse.json();

    if (!wpResponse.ok) {
      console.error('WordPress API error:', wpResult);
      return NextResponse.json({ 
        error: wpResult.message || 'Failed to send notification. Please try again.' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully. You can now download the PDF.'
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json({ 
      error: 'An unexpected error occurred. Please try again.' 
    }, { status: 500 });
  }
}