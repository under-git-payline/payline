import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const customerName = formData.get('customerName') as string || 'Website User';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 });
    }

    // Validate file type (common statement formats)
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Please upload PDF, image, or Excel files.' 
      }, { status: 400 });
    }

    // Create form data for WordPress API
    const wpFormData = new FormData();
    wpFormData.append('name', customerName);
    wpFormData.append('email', ''); // No email provided
    wpFormData.append('message', `Statement upload from website user: ${customerName}`);
    wpFormData.append('file', file);

    // Send to WordPress backend
    const wpResponse = await fetch(`${process.env.WP_API_URL}/wp-json/payline/v1/upload`, {
      method: 'POST',
      body: wpFormData,
    });

    const wpResult = await wpResponse.json();

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

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'An unexpected error occurred. Please try again.' 
    }, { status: 500 });
  }
}