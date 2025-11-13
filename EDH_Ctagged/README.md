# EDH Ctagged Inscriptions

## What is this dataset?
This dataset includes the XML files for mainly Latin inscriptions. All inscription data is based on [the Epigraphic Database Heidelberg](https://edh.ub.uni-heidelberg.de/), one of the most well-known databases in the Roman studies, by downloading all the XML files it provided in Creative Commons Licence BY-SA. 
However, we made slight additional edits to that, to enable more sophisticated and granular use of epigraphic text data. The modifications are as follows:

- put \<c\> to each single character in the text
- use \<sourceDoc\> as a text container instead of original \<body\>
- replace \<lb\> empty tag with \<line\>

As modifications are all processed automatically using Python, there will be some small problems in the files (and maybe huge ones too). 

## What the advantage?
As each character in the texts is marked with \<c\> and given xml:id, we can refer to it as a web data resource with respective URI. This makes more granular encoding of textual data possible, for example, connecting each character resource to a corresponding image, putting calligraphic information on it, or giving 3D spatial coordinates on the character level. 

## Licence
All data provided in this repository can be reused under the [CC BY-SA 4.0 licence](https://creativecommons.org/licenses/by-sa/4.0/deed.de)


Homepage:
* https://researchmap.jp/jo-fil-ho

Contact:
* Jun Ogawa <htjk6513khbk@gmail.com> (https://github.com/junjun7613)