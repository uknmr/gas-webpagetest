# gas-webpagetest

> ### *You can't control what you can't measure.*
> Tom DeMarco (1982) Controlling Software Projects.

## Requirements

- Node.js
  - This script is written by Node.js
- Yarn
  - pacakge manager
  - This repository is managed by Yarn
- Google Account
  - Need to login with [clasp](https://github.com/google/clasp).
  - `gas-webpagtest` is a Google Apps Script.
- Google Spreadsheet
  - `gas-webpagtest` record the result of WebPagetest to Google Spreadsheet
  - 1 sheet = 1 site
- WebPagetest API Key
  - [WebPagetest - Get API Key](https://www.webpagetest.org/getkey.php)
  - `gas-webpagtest` call WebPagetest API and record it.

### Optional

- Google DataStudio
  - It help visualization of data

## Usage

### Installation

1. git clone this repository

```
git clone https://github.com/uknmr/gas-webpagetest.git
cd gas-webpagetest
```

2. Install dependencies by yarn


```
yarn install
```


3. If you never use `clasp`, please do `clasp login`

```
yarn clasp login
# Login and Authorize clasp
```

### Integrate Google Spreadsheet with Google Apps Script(gas-webpagtest)

4. Create empty spreadsheet that is recored result of WebPagetest.
  - You should copy spreadsheet id
  - For example, your spreadsheet url is `https://docs.google.com/spreadsheets/d/asn__asxScJZi-2asd4242sd23HO441Ok/edit#gid=0`
  - `asn__asxScJZi-2asd4242sdHOeB6t5XFdOk` is a **spreadsheet id** and copy it
5. Create new Google Apps Script and connect it the spreadsheet.
  - If success it, `.clasp.json` is created.
  - First argument is Google Apps Script title
  - Second argument is **spreadsheet id**

```
yarn clasp create "gas-webpagetest" "<spreadsheet id>"
# Example
# yarn clasp create "gas-webpagetest-example" "asn__asxScJZi-2asd4242sdHOeB6t5XFdOk"
```

:memo: If you met following error, you have to visit the url and enable the Apps Script API.

> Error: Permission denied. Enable the Apps Script API:
> https://script.google.com/home/usersettings

6. Modify `.clasp.json`
  - Add `rootDir` to `.clasp.json`
  
Changet the `.clasp.json`

```json
{"scriptId":"x1233-2asd4x2444442sdHOeB6sdkdfkjsdljsdlkfjdsklfjt5XFdOk"}
```

to

```json
{"scriptId":"x1233-2asd4x2444442sdHOeB6sdkdfkjsdljsdlkfjdsklfjt5XFdOk", "rootDir": "dist"}
```

7. Copy `.env.example` to `.env` and setting it.

You can get `WEBPAGETEST_API_KEY` from [WebPagetest - Get API Key](https://www.webpagetest.org/getkey.php).

```.env
WEBPAGETEST_API_KEY=<webpagetest_api_key>
RUN_TEST_URL=https://example.com/
RUN_TEST_INTERVAL=30m
SHEET_NAME=<Spreadsheet's sheet name>

# ==CUSTOMIZE WEBPAGEST OPTIONS==
# WebPagetest Options
# https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis
## Number of test runs (1-10 on the public instance)
## gas-webpagetest use median results
WEBPAGETEST_OPTIONS_RUNS=3
# ... Other .... 
```


8. Deploy the gas-webpagetest script to your Google Apps Script: `yarn run deploy`

Run following command that deploy this script.

```
yarn run deploy
```

## Setting schedule for `gas-webpagtest`

`gas-webpagtest` provide these functions.

- Run Test
  - Run test that call WebPagetest API
- Get Test results
  - Get results of the test and write it to spreadsheet
- Update column titles
  - Update spreadsheet title columns

These functions can be called manually.  
However, These functions can be regularly called by **Time Trigger**.

So, you can set **Time Trigger** by the following function.

- Set run test time triggers
  - You can set time trigger like cron
  - By default, it is per 30 minutes

## Optional: Visualize

[Google DataStudio](https://datastudio.google.com) help to visualize your spreadsheet data.

- TODO: Copy template for `gas-webpagtest` from HERE
