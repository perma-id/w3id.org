# /jp-procedure/

行政手続LOD(Gyosei Tetsuzuki LOD)の永続的な識別子。

- `def`(語彙): 語彙のファイル <https://h-kazuki-pixel.github.io/jp-procedure/vocab.ttl> へ転送する。
- `procedure/`・`provision/`・`law/`・`change/`・`record/`・`organisation/`・`code/` の下:
  - HTML を求めるとき: <https://h-kazuki-pixel.github.io/jp-procedure/view.html> へ転送する。
  - それ以外(Turtle・JSON-LD・`*/*`・Accept なし): SPARQL の DESCRIBE の結果へ転送する。返る形は Accept で決まる。
- 出どころの資源(`activity/`・`agent/`・`dataset/`・`period/`・`plan/`・`source/` の下): HTML 以外を求めるときは、SPARQL の DESCRIBE の結果へ転送する。HTML を求めるときは、下の「それ以外」と同じく GitHub Pages へ転送する。
  - `activity/`: データを作った作業(`prov:Activity`。RDF の生成、改正の区分の判定、毎週の追跡、あとの補い)
  - `agent/`: 作業をしたスクリプト(`prov:SoftwareAgent`)
  - `dataset/`: 作業が作ったデータの一まとまり(`prov:Entity`)
  - `period/`: 改正を比べた期間(`dct:PeriodOfTime`。始めの日と終わりの日)
  - `plan/`: 改正の区分を決めた決まりの版(`prov:Plan`)
  - `source/`: 元にしたデータ(`prov:Entity`。行政手続の調査の表、e-Gov 法令API)
- 英数字・`_`・`.`・`/`・`-` 以外を含む URL も、GitHub Pages へ転送する。
- それ以外: <https://h-kazuki-pixel.github.io/jp-procedure/> へ転送する。

Documentation: <https://github.com/h-kazuki-pixel/jp-procedure>

## Contacts

- 橋本一輝
  - GitHub: [h-kazuki-pixel](https://github.com/h-kazuki-pixel)
