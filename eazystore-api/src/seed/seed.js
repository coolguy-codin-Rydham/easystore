const bcrypt = require('bcryptjs');
const Customer = require('../models/Customer');
const Product = require('../models/Product');

const products = [
  { name: 'Developer', description: 'Code Wizard!', price: 5.0, popularity: 85, imageUrl: '/stickers/developer.png' },
  { name: 'Break', description: 'Hey, lets take a breather and start fresh on the next line', price: 4.5, popularity: 40, imageUrl: '/stickers/break.png' },
  { name: 'Not a bug', description: "It's a surprise functionality.", price: 6.0, popularity: 98, imageUrl: '/stickers/itsnotabug.png' },
  { name: 'Devster', description: 'They exist!', price: 5.0, popularity: 72, imageUrl: '/stickers/EatSleepCode.png' },
  { name: 'CodeSmasher', description: 'Fearless developer!', price: 7.5, popularity: 88, imageUrl: '/stickers/BreakingCode.png' },
  { name: 'CodeMate', description: "Without you, I'm incomplete!", price: 2.0, popularity: 79, imageUrl: '/stickers/youaremycss.png' },
  { name: 'Mbappé', description: 'Phenomenal!', price: 8.0, popularity: 55, imageUrl: '/stickers/Mbappe.png' },
  { name: 'AstroChill', description: 'Cool for gravity!', price: 3.0, popularity: 52, imageUrl: '/stickers/CoolAstraunaut.png' },
  { name: 'Ronaldo', description: 'Legendary!', price: 8.0, popularity: 100, imageUrl: '/stickers/ronaldo.png' },
  { name: 'My Driving Scares Me Too', description: 'They exist!', price: 5.0, popularity: 65, imageUrl: '/stickers/MyDrivingScaresMeToo.png' },
  { name: 'Three headed dragon symbol', description: 'Targaryen dynasty strength', price: 9.0, popularity: 98, imageUrl: '/stickers/HouseOfTheDragonSymbol.png' },
  { name: 'Squid Game', description: "Let's play", price: 5.0, popularity: 70, imageUrl: '/stickers/SquidGame.png' },
  { name: 'Shin-Chan', description: 'Mischievous!', price: 5.0, popularity: 70, imageUrl: '/stickers/Shinchan.png' },
  { name: 'Game over', description: 'Game over!', price: 5.0, popularity: 50, imageUrl: '/stickers/GameOver.png' },
  { name: 'Messi', description: 'Magical!', price: 10.0, popularity: 99, imageUrl: '/stickers/Messi.png' },
  { name: 'Virat Kohli', description: 'King', price: 9.0, popularity: 99, imageUrl: '/stickers/Virat.png' },
  { name: 'Lazy Cat', description: 'Not Today', price: 6.0, popularity: 60, imageUrl: '/stickers/LazyCat.png' },
  { name: 'Busy Brain', description: 'Overthinker!', price: 4.0, popularity: 50, imageUrl: '/stickers/OverThinker.png' },
  { name: 'Naruto', description: 'Ninja!', price: 6.0, popularity: 60, imageUrl: '/stickers/Naruto.png' },
  { name: 'Goku', description: 'Warrior!', price: 6.0, popularity: 60, imageUrl: '/stickers/Goku.png' },
  { name: 'I am okay', description: 'Persistent!', price: 6.0, popularity: 60, imageUrl: '/stickers/IamOkay.png' },
  { name: 'Boo', description: 'Disapproval!', price: 6.0, popularity: 60, imageUrl: '/stickers/Boo.png' },
  { name: 'EW feeling', description: 'Disgust!', price: 6.0, popularity: 60, imageUrl: '/stickers/EwFeelings.png' },
  { name: 'Be wild', description: 'Unleashed!', price: 6.0, popularity: 60, imageUrl: '/stickers/BeWild.png' },
  { name: 'SummerCat', description: 'Heatwave Whiskers', price: 6.0, popularity: 60, imageUrl: '/stickers/AestheticSummerCat.png' },
  { name: 'Savageness', description: 'Your opinion means nothing', price: 6.0, popularity: 60, imageUrl: '/stickers/YourOpinonMeansNothing.png' },
  { name: 'Awkweird', description: 'Awkward and Weird', price: 6.0, popularity: 60, imageUrl: '/stickers/SociallyAwkward.png' },
  { name: 'Blue Butterfly', description: 'Gracewing', price: 6.0, popularity: 60, imageUrl: '/stickers/Butterfly.png' },
  { name: 'NoHesitation', description: 'Always ready to take charge!', price: 6.0, popularity: 60, imageUrl: '/stickers/IWon_tHesitateSticker.png' },
  { name: 'Wardgaze', description: 'Protective power of the evil eye', price: 6.0, popularity: 60, imageUrl: '/stickers/EvilEye.png' },
];

async function seed() {
  const productCount = await Product.estimatedDocumentCount();
  if (productCount === 0) {
    await Product.insertMany(products);
    console.log(`[seed] inserted ${products.length} products`);
  }

  const adminEmail = 'admin@eazystore.com';
  const exists = await Customer.findOne({ email: adminEmail });
  if (!exists) {
    const passwordHash = await bcrypt.hash('password', 10);
    await Customer.create({
      name: 'Eazy Admin',
      email: adminEmail,
      mobileNumber: '9999999999',
      passwordHash,
      address: { street: 'Admin St', city: 'Admin City', state: 'AS', postalCode: '00000', country: 'IN' },
      roles: ['ROLE_USER', 'ROLE_ADMIN'],
    });
    console.log(`[seed] admin user ready — login with "${adminEmail}" or "9999999999" / password "password"`);
  }
}

module.exports = { seed };
