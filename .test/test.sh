#!/bin/bash

return_code=0
for f in $(find /usr/local/apache2/htdocs -name '.htaccess')
do
    echo "Processing file $f"
    grep "##TESTv1" "$f" | while read -r line ; do
        #eval "parts=($IN)"
        declare -a "parts=($( echo "$line" | sed 's/[][`~!@#$%^&*();<>,?\|{}=+]/\\&/g' ))"

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

done
exit $return_code
