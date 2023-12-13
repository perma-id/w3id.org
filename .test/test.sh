#!/bin/bash

return_code=0
for f in $(find /usr/local/apache2/htdocs -name '.htaccess')
do
    echo "Processing file $f"
    res=$(grep "##TESTv1" "$f")
    if [ "$res" == "" ]; then
        echo "No tests found"
        continue
    fi
    #eval "parts=($IN)"
    declare -a "parts=($( echo "$res" | sed 's/[][`~!@#$%^&*();<>,?\|{}=+]/\\&/g' ))"

    curl="curl -sL -o /dev/null -w "%{url_effective}" --resolve www.w3id.org:80:127.0.0.1 www.w3id.org:80"
    curl_cmd="${parts[1]}"
    expected_result="${parts[2]}"
    echo "TEST '$curl_cmd' => '$expected_result'"
    
    cmd="$curl$curl_cmd"
    result=$(bash -c "$cmd")
    if [ "$result" == "$expected_result" ]; then
        echo "SUCCESS: Result is '$result'"
    else
        echo "ERROR  : Result is '$result'"
        return_code=1
    fi

done
exit $return_code

