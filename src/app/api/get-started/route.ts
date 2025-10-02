import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      isUsBased, 
      processingVolume 
    } = await request.json();

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const fullName = `${firstName} ${lastName}`;

    // Create form data for WordPress API
    const wpFormData = new FormData();
    wpFormData.append('name', fullName);
    wpFormData.append('email', email);
    wpFormData.append('message', `Multi-Step Form Submission

Name: ${fullName}
Email: ${email}
Phone: ${phone}
US Based: ${isUsBased === 'yes' ? 'Yes' : 'No'}
Monthly Processing Volume: ${processingVolume}

This user has completed the multi-step questionnaire and is interested in payment processing services.`);

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
      message: 'Form submitted successfully. Our team will contact you shortly.'
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json({ 
      error: 'An unexpected error occurred. Please try again.' 
    }, { status: 500 });
  }
}