# AI workout generator


# FLOW

  1. API recieves promt
  2. generates json:
  3. Returns JSON:
```JSON
[
"block-1": {
  "duration": 15,
  "sone": 2,
  "threshold": "70-85"
},
"block-2": {
  "duration": 3,
  "sone": 4,
  "threshold": "99-104"
},
]

  
    
```
  4. Frontend renders block (height based on % of ftp (150max) and width is based on current blocks duration / (total duration of all blocks)).
