# /arp/
This [W3ID](https://w3id.org) provides a persistent URI namespace for the Hungarian national repository service "Adatrepozitórium Platform" ([ARP](https://science-research-data.hu/en)).

## Maintainers

**Balázs Pataki** |
[SZTAKI](https://sztaki.hu/en), [DSD](https://dsd.sztaki.hu/) |
<balazs.pataki@sztaki.hu>
| GitHub: [beepsoft](https://github.com/beepsoft) | ORCID: [0000-0003-3482-0325](https://orcid.org/0000-0003-3482-0325)

**András Micsik** | [SZTAKI](https://sztaki.hu/en), [DSD](https://dsd.sztaki.hu/)  | <andras.micsik@sztaki.hu> | GitHub: [micsik](https://github.com/micsik) | ORCID: [0000-0001-9859-9186](https://orcid.org/0000-0001-9859-9186)

**Péter Pallinger** | [SZTAKI](https://sztaki.hu/en), [DSD](https://dsd.sztaki.hu/)  | <peter.pallinger@sztaki.hu> | GitHub: [pallinger](https://github.com/pallinger) | ORCID: [0000-0002-7069-1850](https://orcid.org/0000-0002-7069-1850)


## Development and Testing

Use the [Apache .htaccess Tester](https://github.com/chaseconey/htaccess-tester)

In the project root folder

### Fire up htaccess tester in docker

```
docker run -p 6080:80 -v "$PWD:/usr/local/apache2/htdocs" chaseconey/htaccess-tester
```

### Evaluate some links

Production schema: http://localhost:6080/arp/schema/c9cac144-6260-33fe-886e-71a42914ef9f
```
> curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arp/schema/c9cac144-6260-33fe-886e-71a42914ef9f"
302: https://openview.cedar.dsd.sztaki.hu/templates/https:%2F%2Frepo.cedar.dsd.sztaki.hu%2Ftemplates%2Fc9cac144-6260-33fe-886e-71a42914ef9f
```

Development schema: http://localhost:6080/arp/dev/schema/c9cac144-6260-33fe-886e-71a42914ef9f
```
> curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arp/dev/schema/c9cac144-6260-33fe-886e-71a42914ef9f"
302: https://openview.cedardev.dsd.sztaki.hu/templates/https:%2F%2Frepo.cedardev.dsd.sztaki.hu%2Ftemplates%2Fc9cac144-6260-33fe-886e-71a42914ef9f
```

Local development schema: http://localhost:6080/arp/localdev/schema/c9cac144-6260-33fe-886e-71a42914ef9f
```
> curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arp/localdev/schema/c9cac144-6260-33fe-886e-71a42914ef9f"
302: https://openview.arp.orgx/templates/https:%2F%2Frepo.arp.orgx%2Ftemplates%2Fc9cac144-6260-33fe-886e-71a42914ef9f
```

Production file: http://localhost:6080/arp/ro-id/doi:10.5072/FK2/ZL0O25/file/364
```
curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arp/ro-id/doi:10.5072/FK2/ZL0O25/file/364"
302: https://concorda2test.dsd.sztaki.hu/file.xhtml?persistentId=doi:10.5072/FK2/ZL0O25&fileId=364
```

Dev file: http://localhost:6080/arp/dev/ro-id/doi:10.5072/FK2/ZL0O25/file/364
```
curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arp/dev/ro-id/doi:10.5072/FK2/ZL0O25/file/364"
302: https://dsddev.concorda.sztaki.hu/file.xhtml?persistentId=doi:10.5072/FK2/ZL0O25&fileId=364
```

Local file: http://localhost:6080/arp/localdev/ro-id/doi:10.5072/FK2/ZL0O25/file/364
```
curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arp/localdev/ro-id/doi:10.5072/FK2/ZL0O25/file/364"
302: http://localhost:8080/file.xhtml?persistentId=doi:10.5072/FK2/ZL0O25&fileId=364
```

Production author: http://localhost:6080/arp/ro-id/doi:10.5072/FK2/ZL0O25/author/123
```
curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arp/ro-id/doi:10.5072/FK2/ZL0O25/author/123"
302: https://concorda2test.dsd.sztaki.hu/dataset.xhtml?persistentId=doi:10.5072/FK2/ZL0O25&fieldName=author&fieldId=123
```

Dev author: http://localhost:6080/arp/dev/ro-id/doi:10.5072/FK2/ZL0O25/author/123
```
curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arp/dev/ro-id/doi:10.5072/FK2/ZL0O25/author/123"
302: https://dsddev.concorda.sztaki.hu/dataset.xhtml?persistentId=doi:10.5072/FK2/ZL0O25&fieldName=author&fieldId=123
```

Local dev author: http://localhost:6080/arp/localdev/ro-id/doi:10.5072/FK2/ZL0O25/author/123
```
curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arp/localdev/ro-id/doi:10.5072/FK2/ZL0O25/author/123"
302: http://localhost:8080/dataset.xhtml?persistentId=doi:10.5072/FK2/ZL0O25&fieldName=author&fieldId=123
```

Production RO-Crate data: http://localhost:6080/arp/ro-id/doi:10.5072/FK2/ZL0O25/a4ea1276-54d3-418b-9008-455c1c691bb5
```
curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arp/ro-id/doi:10.5072/FK2/ZL0O25/a4ea1276-54d3-418b-9008-455c1c691bb5"
302: https://concorda2test.dsd.sztaki.hu/ro-id?persistentId=doi:10.5072/FK2/ZL0O25&elementId=a4ea1276-54d3-418b-9008-455c1c691bb5
```

Dev RO-Crate data: http://localhost:6080/arp/dev/ro-id/doi:10.5072/FK2/ZL0O25/a4ea1276-54d3-418b-9008-455c1c691bb5
```
curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arp/dev/ro-id/doi:10.5072/FK2/ZL0O25/a4ea1276-54d3-418b-9008-455c1c691bb5"
302: https://dsddev.concorda.sztaki.hu/ro-id?persistentId=doi:10.5072/FK2/ZL0O25&elementId=a4ea1276-54d3-418b-9008-455c1c691bb5
```

Local dev RO-Crate data: http://localhost:6080/arp/localdev/ro-id/doi:10.5072/FK2/ZL0O25/a4ea1276-54d3-418b-9008-455c1c691bb5
```
 curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arp/localdev/ro-id/doi:10.5072/FK2/ZL0O25/a4ea1276-54d3-418b-9008-455c1c691bb5"
302: http://localhost:8080/ro-id?persistentId=doi:10.5072/FK2/ZL0O25&elementId=a4ea1276-54d3-418b-9008-455c1c691bb5
```
