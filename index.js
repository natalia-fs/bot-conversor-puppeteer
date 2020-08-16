const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

console.log('Bem-vindo ao bot conversor de moedas!');

async function bot(){
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    
    const moedaBase = readlineSync.question('Qual a moeda base? ') || 'dolar';
    const moedaFinal = readlineSync.question('Qual a moeda desejada? ') || 'real';
      
    const url = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&rlz=1C1SQJL_enBR887BR888&oq=${moedaBase}+para+${moedaFinal}&aqs=chrome..69i57j0l7.22065j1j7&sourceid=chrome&ie=UTF-8`;
    await page.goto(url);
    
    const resultado = await page.evaluate(() => {
        try {
            return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
        } catch(error) {
            console.error(error);
        }
    });

    console.log(`O valor de 1 ${moedaBase} em ${moedaFinal} é ${resultado}`);

    await browser.close();
}

bot();