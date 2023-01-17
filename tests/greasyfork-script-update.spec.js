const { test } = require("@playwright/test");
const fs = require("fs");

const { EMAIL, PASSWORD, SCRIPTID } = process.env;

const script = fs.readFileSync("RumbleChatEmotes.js", "utf8");

test("Update Greasyfork script", async ({ page }) => {
  await page.goto("https://greasyfork.org/en/users/sign_in");
  await page.fill("input[name='user[email]']", EMAIL);
  await page.fill("input[name='user[password]']", PASSWORD);

  let navigationPromise = page.waitForNavigation();
  await page.click("input[type='submit'][value='Log in']");
  await navigationPromise;

  await page.goto(
    "https://greasyfork.org/en/scripts/" + SCRIPTID + "/versions/new"
  );
  await page.fill("textarea[name='script_version[code]']", script);

  navigationPromise = page.waitForNavigation();
  await page.click("input[type='submit'][name='commit']");
  await navigationPromise;
});
