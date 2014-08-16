#RaceKeeper
### by #ECEBROS
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
