# Work

## Include

### Tag

    {{ include mixin.bb }}
    {{ include header/header_01.bb }}

### Process

in parser

- -> found tag with keywork 'include'
 - -> check cache (--skip in current)
 - -> parser included file to js string
 - -> add js string to main template file
