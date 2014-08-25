RaceKeeper by #ECEBROS
========================

Aggregates runs of #ECEBROS and creates a leader board in real time.

---

##Host:

`unix2.andrew.cmu.edu:8080`

##Endpoints:

`/races` -- Returns all races

`/races/:race_id` -- Returns race with ID `race_id`

Response:
```
{
    'Races': [
                {
                    'race_id': <int>,
                    'username': <string>,
                    'members': [<string>, ...],
                    'start_date': <string>, # yyyy-mm-dd
                    'end_date': <string>, # yyyy-mm-dd
                    'race_name': <string>,
                    'activity_type': <string>, # Running, Swimming, Hiking
                },
                ...
            ]
}
```

`/runs/:race_id` -- Returns all runs relevant to race `race_id`

Response:
```
{
    'makagawa': [
                    {
                        'distance': <int>, # in meters
                        'start_time': <string>,
                        'end_time': <string>
                    }, ...
                ],
    'icanberk': [ ... ], 
    'MP': [ ... ]
}
```


`/addRaceGroup`

Request Parameters:
* `start_date`
* `end_date`
* `activity_type`
* `race_name`

Response:
* `race_id`

`/addMemberToRaceGroup`

Request Parameters:
* `member_id` -- Runkeeper ID or OAuth token of that member
* `race_id`
