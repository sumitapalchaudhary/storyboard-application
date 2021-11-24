import { Injectable } from '@angular/core';
import data from '../../assets/Frontend_project_sample_data.json';

@Injectable()
export class ProcessJsonService{

     constructor(){
     }

     loadJsonData(): [] {
        var returnedJSON = JSON.parse(JSON.stringify(data));

        /* var filteredResults = returnedJSON.filter((item: { name: string; }) => {
            return item.name === "jason"
        }); */

        /* const issuesData: IssuesDto[] = returnedJSON.issues.map((val: any) => ({
            expand: val.expand,
            id: val.id,
            self: val.self,
            key: val.key,
            fields: val.fields
        })); */

        var issuesArray = returnedJSON.issues;
        /* console.log(returnedJSON.issues);
        console.log(returnedJSON.issues[0].fields); */
        //console.log(issuesData);

        return issuesArray;
     }
}