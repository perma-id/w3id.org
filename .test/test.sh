#!/bin/bash

# Script to run redirct tests directly on the source .htaccess files

# default: no error
return_code=0

# SEARCH_PATH can provide a single ("/mypath") or multiple values ("/mypath1;/mypath2")
IFS=';' read -ra paths <<< "$SEARCH_PATH"
for path in "${paths[@]}"; do

    # search path can be restricted with env var $SEARCH_PATH
    for f in $(find /usr/local/apache2/htdocs$path -name '.htaccess')
    do
        echo "Processing file $f"

        tests_found=0

        while IFS= read -r line
        do
            tests_found=$((tests_found + 1))

            # Security note: In gerneral it is not secure at all to eval user input
            # (here and later in the curl command).
            # Make sure to run the test within a encapsulated environment 
            # and / or run only the test in your subpath.
            declare -a "parts=($( echo "$line" | sed 's/##TESTv1//g' ))"  

            # note: we request only the effective url and create an alias with --resolve
            # the subpath specified in the test gets appended to the request url
            curl="curl -sL -o /dev/null -w "%{url_effective}" --resolve www.w3id.org:80:127.0.0.1 www.w3id.org:80"
            curl_cmd="${parts[0]}"
            expected_result="${parts[1]}"

            echo "TEST '$curl_cmd' => '$expected_result'"
            
            cmd="$curl$curl_cmd"
            result=$(bash -c "$cmd")

            # compare the result url with the expected url
            if [ "$result" == "$expected_result" ]; then
                echo "SUCCESS: Result is '$result'"
            else
                echo "ERROR  : Result is '$result'"
                return_code=1
            fi
        done < <(grep "##TESTv1" "$f")

        if [ $tests_found == 0 ]; then
            echo "No tests found"
        fi

done

done
exit $return_code
