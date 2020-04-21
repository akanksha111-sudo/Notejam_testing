/* globals gauge*/
"use strict";
const { openBrowser,write,button, closeBrowser, $ , click , goto,label, link,into , press, screenshot, text, focus, textBox, toRightOf,evaluate } = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';
const BASE_URL = "http://127.0.0.1:8000/ ";

beforeSuite(async () => {
    await openBrowser({ headless: headless })
    await goto(BASE_URL);
});

afterSuite(async () => {
    await closeBrowser();
});

gauge.screenshotFn = async function() {
    return await screenshot({ encoding: 'base64' });
};

step("Signup to notejam with <email>", async function(email) {
    await goto(BASE_URL);
    await write(email, into (textBox({name:"email"})));

});

step("Use the password <password>", async function(password) {
    await write(password, into (textBox({name:"password"})));
    await click(button('Sign in'));
    await click(link('New pad'));
});


step("Create a new pad with name <Name> and save", async function(name) {
    await write(name, into (textBox({ name:"name"})));
    await click(button('Save'));
    await click(link('New note'));
    assert.ok(await text(name).exists());
	
});

step("write a note with name <Name>", async function(name) {
	await write(name,into(textBox({name:"name"})));
});

step("write inside the note <text> and save", async function(text) {
    await write(text,into(textBox({name:"text"})));
    await click(button("Save"));
    await evaluate(link("Sign out"),(elem) => elem.click());
    
});

step("Click the button Forgot password", async function() {
	await click(link("Forgot Password"));
});

step("Write <email> in email box and it will generate a new password", async function(email) {
    await write(email,into(textBox({name:"email"})));
    await click(button("Generate password"));
});


step("Click on sign up to create a new account", async function() {
	await click(link("Sign up"));
});


step("signup with email <email>", async function(email) {
	await write(email,into(textBox({name:"email"})));
});

step("Enter password as <password>", async function(password) {
	await write(password,into(textBox({name:"password"})));
});

step("Confirm the password by again typing <repeat_password> and sign up with a new account", async function(repeat_password) {
    await write(repeat_password,into(textBox({name:"repeat_password"})));
    await click(button("Sign up"));
});
