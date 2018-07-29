# gas-webpagetest

~~[Google_Apps_Script_と_Data_Studio_でパフォーマンスモニタリング](https://scrapbox.io/uknmr/Google_Apps_Script_と_Data_Studio_でパフォーマンスモニタリング) で書いたコードです。~~  
TypeScript 化しました。

## つかいかた

[clasp](https://github.com/google/clasp) をつかっています。

1. `.clasp.json` をつくります。

    ```json
    {
      "scriptId": "<script_id>",
      "projectId": "<project_id>",
      "rootDir": "dist"
    }
    ```

1. `.env.example`を`.env`へリネームします。
`.env`の[WebPagetest API Key](https://www.webpagetest.org/getkey.php)、対象 URI、SpreadSheetのシート名は必須であるため、自身の環境に合わせて設定してください。

    ```.env
    WEBPAGETEST_API_KEY=<webpagetest_api_key>
    RUN_TEST_URL=https://example.com/
    SHEET_NAME=<Spreadsheetの記録先のシート名>
    
    # WebPagetest Options
    # https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis
    ## Number of test runs (1-10 on the public instance)
    ## gas-webpagetest use median results
    WEBPAGETEST_OPTIONS_RUNS=3
    # ... その他のオプション .... 
    ```

1. スクリプトエディタから `runTest` と `getTestResults` を呼び出すトリガーを設定します。

### Scriptingを行う

WebPagetestのScriptingに対応しています。

1. `script.txt`を`.env`と同じディレクトリに作成する
2. `script.txt`にWebPagetestのScriptを書き込む

```
logData    0

// put any urls you want to navigate
navigate    www.aol.com
navigate    news.aol.com

logData    1

// this step will get recorded
navigate    news.aol.com/world
```

`script.txt`が指定した位置に存在する場合に自動的に`?script=<script内容>`をWebPagetestに設定します。

- [Scripting - WebPagetest Documentation](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting)

:memo: Note: `script.txt`のファイルが存在する場合は`RUN_TEST_URL`よりも`script.txt`の内容が優先されます。

## 参考
- [DataStudioとGASでWebPagetestの計測結果をグラフ化する | mediba Creator × Engineer Blog](http://ceblog.mediba.jp/post/154874126622/datastudio%E3%81%A8gas%E3%81%A7webpagetest%E3%81%AE%E8%A8%88%E6%B8%AC%E7%B5%90%E6%9E%9C%E3%82%92%E3%82%B0%E3%83%A9%E3%83%95%E5%8C%96%E3%81%99%E3%82%8B)
