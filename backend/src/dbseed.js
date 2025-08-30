const { v4: uuidv4 } = require('uuid');
const User = require('./models/user');
const Category = require('./models/category');
const Photo = require('./models/photo');
const db = require('./utils/db');
const bcrypt = require('bcrypt');

async function seed() {
    try{
        await db.authenticate();
        console.log('Database connection has been established successfully.');

        const users = [
            {
            username: 'john_user',
            email: 'john@example.com',
            age: new Date('1990-05-15'),
            is_admin: false,
            password: 'Hashed_password1'
            },  
            {
            username: 'artwojciech',
            email: 'artwojciech@interia.pl',
            age: new Date('2003-09-15'),
            is_admin: true,
            password: 'Hashed_admin_password'
            }
        ];

        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10); 
            await User.findOrCreate({
                where: { email: user.email },
                defaults: { ...user, password: hashedPassword }
            });
        }

        const categoryNames = ['cars', 'concerts', 'photoshoots', 'sport', 'street', 'wildlife'];
        const categories = {};

        for (const name of categoryNames) {
            const [category] = await Category.findOrCreate({
            where: { name },
            defaults: { name }
            });
            categories[name] = category.id;
        }

        const photosData = [
            { title: '', filename: 'uploads/cars/DSC_2183.png', category_id: categories['cars'] },
            { title: '', filename: 'uploads/cars/DSC_2330.png', category_id: categories['cars'] },
            { title: '', filename: 'uploads/concerts/koncert_przyklad.jpg', category_id: categories['concerts'] },

            { title: '', filename: 'uploads/photoshoots/_DSC1308.png', category_id: categories['photoshoots'] },
            { title: '', filename: 'uploads/photoshoots/_DSC1643.png', category_id: categories['photoshoots'] },
            { title: '', filename: 'uploads/photoshoots/_DSC1715.png', category_id: categories['photoshoots'] },
            { title: '', filename: 'uploads/photoshoots/_DSC1724.png', category_id: categories['photoshoots'] },
            { title: '', filename: 'uploads/photoshoots/_DSC1738.png', category_id: categories['photoshoots'] },
            { title: '', filename: 'uploads/photoshoots/_DSC1752.png', category_id: categories['photoshoots'] },

            { title: '', filename: 'uploads/sport/sport2.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport3.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport4.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport6.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport7.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport8.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport9.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport10.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport11.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport12.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport13.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport14.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport15.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport16.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport17.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport18.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport19.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport20.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport21.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport22.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport23.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport24.jpg', category_id: categories['sport'] },
            { title: '', filename: 'uploads/sport/sport25.jpg', category_id: categories['sport'] },

            { title: '', filename: 'uploads/street/_DSC1060.png', category_id: categories['street'] },
            { title: '', filename: 'uploads/street/_DSC1132.png', category_id: categories['street'] },
            { title: '', filename: 'uploads/street/DSC_1762.png', category_id: categories['street'] },
            { title: '', filename: 'uploads/street/DSC_1783.png', category_id: categories['street'] },
            { title: '', filename: 'uploads/street/DSC_1789.png', category_id: categories['street'] },
            { title: '', filename: 'uploads/street/DSC_1802.png', category_id: categories['street'] },
            { title: '', filename: 'uploads/street/DSC_1809.png', category_id: categories['street'] },
            { title: '', filename: 'uploads/street/DSC_2454.png', category_id: categories['street'] },
            { title: '', filename: 'uploads/street/DSC_2510.png', category_id: categories['street'] },
            { title: '', filename: 'uploads/street/DSC_2537.png', category_id: categories['street'] },
            { title: '', filename: 'uploads/street/DSC_2560.png', category_id: categories['street'] },
            { title: '', filename: 'uploads/street/wiesinkrakow.png', category_id: categories['street'] },
            { title: '', filename: 'uploads/street/wiesinkrakowdwa.png', category_id: categories['street'] },

            { title: '', filename: 'uploads/wildlife/DSC_2006.png', category_id: categories['wildlife'] },
            { title: '', filename: 'uploads/wildlife/DSC_2010.png', category_id: categories['wildlife'] },
            { title: '', filename: 'uploads/wildlife/DSC_2024_01.png', category_id: categories['wildlife'] },
            { title: '', filename: 'uploads/wildlife/DSC_2027.png', category_id: categories['wildlife'] },
            { title: '', filename: 'uploads/wildlife/drugiemorelki.png', category_id: categories['wildlife'] },
            { title: '', filename: 'uploads/wildlife/pierwszemorelki.png', category_id: categories['wildlife'] },
            { title: '', filename: 'uploads/wildlife/DSC_2682.png', category_id: categories['wildlife'] },
            { title: '', filename: 'uploads/wildlife/DSC_2733.png', category_id: categories['wildlife'] },
            { title: '', filename: 'uploads/wildlife/DSC_2753.png', category_id: categories['wildlife'] },
        ];

        for (const photo of photosData) {
            await Photo.findOrCreate({
            where: { filename: photo.filename },
            defaults: photo
            });
        }

        console.log('Data was added from seed');
        process.exit(0);
    }
    catch (error) {
    console.error('DB error', error);
    process.exit(1);
    }
}

seed();
module.exports = seed;     // chyba nie potrzebne, dzieki temu moge uruchomic seeda w innych miejscach ale nwm czy chce narazie
