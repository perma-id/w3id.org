# Sentix

Sentix is an **affective lexicon for the Italian language**, created in 2013 by aligning several lexical resources. This version, Sentix 3.0, represents a significant update, incorporating an expanded set of lemmas (**63,660 entries**), with associated **polarity scores** (ranging from -1 to +1) and **categorical polarity classifications** (Positive, Neutral, Negative).

## Background

The original Sentix lexicon was created in 2013 (Basile & Nissim, 2013) by aligning several lexical resources: *SentiWordNet* (Baccianella et al., 2010), *MultiWordNet* (Pianta et al., 2002) and *Wordnet* (Fellbaum, 1998). Performance was evaluated against manually annotated data.

**Sentix 2.0** aggregated polarity scores for lemma senses into a single score (-1 to 1) using a weighted average with sense frequencies from the SemCor corpus (Langone et al., 2004; Vassallo et al., 2020). Sentix 2.0 (41,800 lemmas) has been available via the `sentixR` R package on GitHub since 2019 (Basile, 2019-2024).

Two derived resources were also developed:

- **MAL (Morphologically-inflected Affective Lexicon)** (Vassallo et al., 2019): Expanded Sentix 2.0 with inflected forms from *Morph-it!* (Zanchetta & Baroni, 2005) to address lemmatization challenges in Italian sentiment analysis.

- **WMAL (Weighted-MAL)** (Vassallo et al., 2020): Recalculated MAL’s scores by weighting them with word frequencies from the TWITA corpus (Basile & Nissim, 2013) to reduce polarity imbalance. The weighting methodology and polarity calculation based on WMAL are key to Sentix 3.0’s polarity categorical classification.
