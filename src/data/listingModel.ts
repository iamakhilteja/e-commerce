export interface ListingInterface {
    postid: number,
    post_title: string,
    description: string,
    vancancies: number,
    posted_data: string,
    location: string,
    pay: number,
    pay_type: string,
    start_date: string,
    end_date: string,
    working_days: number,
    skills: string[],
    languages: string[]
}