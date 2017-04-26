<html>
    <head>
        <title>{{ title }}</title>
    </head>
    <body>
        <h1>Hello {{ name }}</h1>
        <p>Hava a nice day!</p>
        {{ if time < 12 }}
            morning
        {{ elseif time < 18 }}
            afternoon
        {{ else }}
            night
        {{ endif }}
        {{ each i in 'abcdefgh' }}
            {{ continue __key__ < 2 }}
            {{ if i == 'g' }}
                {{ break }}
            {{ endif }}
            {{ i }} - {{ __key__ }} - {{ __count__ }} <br>
        {{ endeach }}
        {{ include copyright.bb }}
    </body>
</html>
