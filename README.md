# reg-cliを試すためのリポジトリです

## setup
```sh
docker-compose run --rm app yarn install
```

## 使い方

### `websites.json`に対象ページを記述
```json
{
  "example":"https://example.com",
  "example2":"https://example.com"
}
```

### `image/actual`の更新をしたい時

```sh
// /actualの画像の時
node src/scraping.js actual
```

### テスト画像更新 & テスト実行

```sh
yarn reg

// -Uオプションをつけるとテスト実行後にexpectedの画像がactualにコピーされる
yarn reg -U
```
