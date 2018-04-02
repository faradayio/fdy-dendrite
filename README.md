# Dendrite

A command-line tool to disaggregate rows in a csv by a delimited field

#### What we have
```CSV
name,address,date
Naomi and Bob,123 Main St,2018-03-01
Ethan,22 Maple St, 2017-12-05
```

#### What we want:
```CSV
name,address,date
Naomi,123 Main St,2018-03-01
Bob,123 Main St,2018-03-01
Ethan,22 Maple St, 2017-12-05
```

## Install
`npm install -g dendrite`

## Usage

`dendrite -i <input filename> -f <split field name> -o <output filename>`

## Arguments
* `-i, --input` (_REQUIRED_) Input filename and path (e.g. '/home/ubuntu/inputfile.csv')
* `-f, --field` (_REQUIRED_) Name of delimited field on which to duplicate rows (e.g. `name`)
* `-o, --output` (_OPTIONAL_) Output filename and path. Default is the input filename with 'out_' prepended.
