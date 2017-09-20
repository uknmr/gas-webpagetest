# gas-webpagetest

[Google_Apps_Script_と_Data_Studio_でパフォーマンスモニタリング](https://scrapbox.io/uknmr/Google_Apps_Script_と_Data_Studio_でパフォーマンスモニタリング) で書いたコードです。

## つかいかた

[danthareja/node-google-apps-script](https://github.com/danthareja/node-google-apps-script) を使ってアップロードしています。

```bash
$ yarn run publish
```

アップロードした GAS はライブラリとして読み込んで使う想定です。

```js
function runTest() {
  WebPagetest.runWebPagetest('{API_KEY}', {
    url:'{url}', sheetName: '{sheetName}'
  }, {
    url:'{url}', sheetName: '{sheetName}'
  })
}

function getResults() {
  WebPagetest.getTestResults()
}
```

## 参考
- [DataStudioとGASでWebPagetestの計測結果をグラフ化する | mediba Creator × Engineer Blog](http://ceblog.mediba.jp/post/154874126622/datastudio%E3%81%A8gas%E3%81%A7webpagetest%E3%81%AE%E8%A8%88%E6%B8%AC%E7%B5%90%E6%9E%9C%E3%82%92%E3%82%B0%E3%83%A9%E3%83%95%E5%8C%96%E3%81%99%E3%82%8B)
