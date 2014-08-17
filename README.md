RaceKeeper by #ECEBROS
========================

Aggregates runs of #ECEBROS and creates a leader board in real time.

---
##Endpoints:

`/races` (NYI) -- Returns all races
`/races/:racegroup_id` -- Returns race with ID `racegroup_id`

Response:
```
{
    'Races': [
                {
                    'racegroup_id': <int>,
                    'username': <string>,
                    'members': [<string>, ...],
                    'start_date': <string>,
                    'end_date': <string>,
                    'race_name': <string>,
                    'activity_type': <string>, # Running, Swimming, Hiking
                },
                ...
            ]
}
```

`/runs/:racegroup_id` (NYI) -- Returns all runs relevant to race `racegroup_id`

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


`/addRaceGroup` (NYI)

Request Parameters:
* `start_date`
* `end_date`
* `activity_type`
* `race_name`

Response:
* `racegroup_id`

`/addMemberToRaceGroup` (NYI)

Request Parameters:
* `member_id`
* `racegroup_id`
