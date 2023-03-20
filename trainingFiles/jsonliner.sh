jq -c '.[]' okrMarketingSampleShort.json | while read i; do
echo $i >> okrMarketingSampleShort.jsonl
done
