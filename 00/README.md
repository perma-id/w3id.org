Controlled Vocabulary IDs for Real Numbers
==========================================

◦ In a [VSM](https://vsm.github.io)-sentence, every concept has an identifier,
  so numeric concepts (no matter how large or small) need an ID too.  
◦ Therefore [to-exponential](https://github.com/stcruy/to-exponential)
  generates a _normalized_ string-ID for every real number, given as a string in decimal or exponential notation.  
◦ Next, [vsm-dictionary](https://github.com/vsm/vsm-dictionary) adds a prefix to these IDs,
  so they align with other ontology or CV IDs used in VSM-sentences.  
◦ Like this, numeric concepts can be managed in the [vsm-box](https://github.com/vsm/vsm-box) user interface,
  and shared in VSM-JSON.  
◦ The original CURIE form was `00:<ID>` – so for example `00:1.23e+2`, for the number `123`=`0.0123e4`=`1230e-1`=….  
◦ The new URI form is `https://w3id.org/00/<ID>`.  

### Example
* Go to [https://vsm.github.io/demo](https://vsm.github.io/demo),
* type `123` {Enter} ,
* => a VSM-term with a classID having the `00` CV's prefix is added.

### Contact
* [Steven Vercruysse](https://github.com/stcruy)
