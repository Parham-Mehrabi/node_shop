import Category from '../models/category'


export default async function get_random_category() {
    //  return a random user from db
    try {
        
        // get user counts
        const products_count = await Category.countDocuments();

        // choose an index for users:
        const chosen = Math.floor(Math.random() * products_count)

        // get the user
        const random_product = await Category.aggregate(
            [
                { $skip: chosen },
                { $limit: 1 }
            ]
        ).exec();        
        return random_product[0]
    } catch (e) { console.log(e) }
    // TODO: add test for it
}
