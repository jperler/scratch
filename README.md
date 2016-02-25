# scratch
Parse NY lotto scratch prize report into JSON
### Installing scratch
```bash
$ git clone git@github.com:jperler/scratch.git
$ cd scratch
$ npm install
```
### Running scratch
```bash
$ ./bin/scratch [pdf]
```

#### Generates: output/&lt;filename&gt;.json
```json
[
   {
      "name":"$1,000,000 Cashword",
      "numbers":[
         615,
         1163
      ],
      "prizes":[
         {
            "total":1000000,
            "remaining":2,
            "freq":null
         },
         {
            "total":5000,
            "remaining":59,
            "freq":null
         }
      ]
   },
   {
      "name":"$1,000,000 Frenzy",
      "numbers":[
         1215
      ],
      "prizes":[
         {
            "total":1000000,
            "remaining":4,
            "freq":null
         },
         {
            "total":9000,
            "remaining":9,
            "freq":null
         }
      ]
   },
   {
      "name":"$10,000 A Week for Life",
      "numbers":[
         1121
      ],
      "prizes":[
         {
            "total":10000,
            "remaining":1,
            "freq":"WEEK"
         },
         {
            "total":20000,
            "remaining":10,
            "freq":null
         }
      ]
   },
   {
      "name":"$2,500 A Week for Life",
      "numbers":[
         1122
      ],
      "prizes":[
         {
            "total":2500,
            "remaining":1,
            "freq":"WEEK"
         },
         {
            "total":3000,
            "remaining":50,
            "freq":null
         }
      ]
   },
   {
      "name":"$3,000,000 Frenzy",
      "numbers":[
         1214
      ],
      "prizes":[
         {
            "total":3000000,
            "remaining":4,
            "freq":null
         },
         {
            "total":10000,
            "remaining":53,
            "freq":null
         }
      ]
   },
   {
      "name":"$3,000,000 Super Cash",
      "numbers":[
         1174
      ],
      "prizes":[
         {
            "total":3000000,
            "remaining":1,
            "freq":null
         },
         {
            "total":10000,
            "remaining":1,
            "freq":null
         }
      ]
   },
   {
      "name":"10X The Luck",
      "numbers":[
         1234
      ],
      "prizes":[
         {
            "total":25000,
            "remaining":10,
            "freq":null
         },
         {
            "total":2500,
            "remaining":132,
            "freq":null
         }
      ]
   },
   {
      "name":"40X Your Money",
      "numbers":[
         1168
      ],
      "prizes":[
         {
            "total":100000,
            "remaining":3,
            "freq":null
         },
         {
            "total":12500,
            "remaining":2,
            "freq":null
         }
      ]
   }
]
```
