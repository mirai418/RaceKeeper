RaceKeeper by #ECEBROS
========================

End Points:

- /races returns all races in db.
- /raec/:id returns the race with id

each race should be have at least the following attirbutes:
id
username (foreign key to owner of race)
run_time (a date-time in whatever format JSON is in)
distance (idk pick a unit. integer perferred, so maybe meters?)

e.g.
{
  "id": 1,
  "username": "mirai418",
  date: "2014-08-16T17:10:48.858Z",
  distance: 4820
}

Aggregates runs of #ECEBROS and creates a leader board in real time.

---
##Endpoints:

`/getRunsForRaceId` (NYI)

Request Parameters:
* `racegroup_id`

Response:
```
{
    'makagawa': [
                    {
                        'distance': <int>,
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
