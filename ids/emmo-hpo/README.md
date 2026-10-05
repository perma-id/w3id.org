# Hyper-dimensional Polymer Ontology

| ![Dimensions](./graphics/dimensions.png) | An ontology to capture the staggering diversity of polymeric materials and their applications. |
| ---------------------------------------- | ------------------------------------------------------------ |

We apply semantic technologies to describe the following domains:

* Composite materials
* Energy materials
* Bio-materials.

## EMMO remarks

List here the feedback on EMMO classes.

* `emmo:Objective`  remove it as a covering class.
* `emmo:Representation` could also be a subclass of `emmo:SymbolicConstruct`?
* Missing classes that should be in EMMO:
  * `MolecularWeight` and `Strength` as sublasses of `emmo:Intensive` -> `emmo:CategorizedPhysicalQuantity`.
  * `ChemicalReaction` as a subclass of `emmo:PhysicalPhenomenon` (a `emmo:Process`). 
  * `ChemicalStructure` as a subclass of `emmo:NominalProperty`? And distinct from `emmo:StructuralFormula`, which stands for a graphical representation of a molecular structure showing the relative position in space of atoms and bonds.
* The `ChemicalStructure` is a covering class that should be used for `hpo:Branched`, `hpo:crosslinked`, and `hpo:Linear` instead or them being sublasses of `hpo:SkeletalFormula`.  Also, `ChemicalStructure` will cover: `hpo:isotactic`, `hpo:syndiotactic`, and `hpo:atactic`.

## Contacts
This space is maintained by [Daniele Toti](https://github.com/Leienad).