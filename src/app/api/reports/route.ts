import { NextResponse } from "next/server"

// In production, this would use Supabase
// For demo, we just return success
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { company_name, job_title, outcome, response_time } = body

    if (!company_name || !job_title || !outcome || !response_time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In production: create company if not exists, then insert report
    // const supabase = createClient()
    // const slug = company_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    // let { data: company } = await supabase.from('companies').select().eq('slug', slug).single()
    // if (!company) {
    //   const { data } = await supabase.from('companies').insert({ name: company_name, slug }).select().single()
    //   company = data
    // }
    // await supabase.from('reports').insert({ company_id: company.id, job_title, country, outcome, response_time, rejection_email, comment })

    return NextResponse.json({ success: true, message: "Report submitted successfully" })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
