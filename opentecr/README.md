# /opentecr/
This [W3ID](https://w3id.org) provides a persistent URI namespace for openTECR.

## Uses
OpenTECR is an Open Database for Thermodynamics of Enzyme-Catalyzed Reactions. This namespace is used to mint/redirect GUPRIs for individual data entries which are part of openTECR. This includes actual data items, but also the data schema and meta information.


## See also
See <https://groups.google.com/g/opentecr> for more details and to get in touch.


## Pool of maintainers of this namespace
For the sake of simplicity, current maintainers of this namespace can appoint additional members. All people in this pool can make any change to this namespace.

The ultimate control over changes in this namespace lies naturally in the hands of the w3id.org GitHub repo maintainers.

The pool of maintainers consists of (alphabetical order):

* https://github.com/eladnoor
* https://github.com/Midnighter
* https://github.com/rgiessmann


## Change policy in this namespace
No official change policy in place (yet). We are trying to be sensible, though.


## Internal: Instruction to keep aminimalistic w3id.org repo on one's hard disk
```
echo '''
# git ls-files --others --exclude-from=.git/info/exclude
# Lines that start with '#' are comments.
# For a project mostly in C, the following would be a good set of
# exclude patterns (uncomment them if you want to use them):
# *.[oa]
# *~
*
**/*
!opentecr/
!opentecr/**
!related-to/
!related-to/**
''' > .git/info/exclude

find .  -not -path '.'                                      \
        -not -path './.*'                                   \
        -not -path './.*/*'                                 \
        -not -path './README.md'                            \
        -not -path './index.html'                           \
        -not -path './opentecr' -not -path './opentecr/*'   \
        -not -path './related-to' -not -path './related-to/*'   \
        -not -path './deleted_files.txt'                    \
        -type f -delete -print > deleted_files.txt

find . -type d -empty -delete

git update-index --assume-unchanged `paste -sd ' ' deleted_files.txt`

rm deleted_files.txt
```


## Contact
See above for persons who are supposed to change this namespace.

If you want to contact a single person about this namespace, please refer to:

**Robert Giessmann**  \
Berlin, Germany  \
<rgiessmann@gmail.com>  \
GitHub: [rgiessmann](https://github.com/rgiessmann)  \
ORCID: [0000-0002-0254-1500](https://orcid.org/0000-0002-0254-1500)
