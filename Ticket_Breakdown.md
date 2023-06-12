# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Main story/Epic

Our facilities partners need a way to add their custom IDs for each of their agents in the database.
They will provide us with a CSV containing the agent's email and their IDs.

### 1121 - Add a new column to the agents' table in the database

Add a new column called `facility_agent_id` in the `agents` table.

##### Acceptance criteria

- The column name should be: `facility_agent_id`;
- The column can be **nullable**;
- The column type is `UUID`;

##### Estimation: 2 points
##### Role: Database Administrator/Backend Engineer.

## 1122 - Add a property to the Agent model.

Add a new property called `facilityAgentId` to the `Agent` model.

##### Acceptance criteria

- The property should be added to the `Agent` and named `facilityAgentId`;

##### Estimation: 1 point
##### Role: Backend Engineer

## 1123 - Add a new method to the Agent repository to find it by email

Add a new method on the `AgentsRepository`, so we can find them by their emails.

##### Acceptance criteria

- The method should return a single `Agent` model;
- The method should receive an `email` as a parameter;

##### Estimation: 2 points
##### Role: Backend Engineer



### 1124 - Develop a new API endpoint to import CSV files with custom agent IDs.

We need a new API endpoint, that takes the facilityId and accepts a CSV file, it needs to read through each row in this file and find a matching record in our `agents` table using the `email` column and the email provided, and then update the new `facility_agent_id` column, with the new custom ID found in the CSV.

##### Acceptance criteria

- The endpoint should be `/facilities`/agents/custom-ids/import`;
- The facilityId should be validated and have proper error handling;
- The CSV file should be validated to check for `email` and `ID` fields;
- The documentation should be properly updated with the new endpoint;

##### Estimation: 5 points
##### Role: Backend Engineer
##### Depends on: 1121, 1122, 1123.

### 1125 - Develop a user interface so our facility partners can upload a CSV.

We need a new UI so that our user can choose their facility from a list of facilities, and import a CSV file. It needs to send the file to the `/facilities/agents/custom-ids/import` endpoint;

##### Acceptance criteria

- The UI should have a Select input with a list of facilities;
- The UI should have a file upload input that only accepts CSV;
- A POST request should be made to the `/facilities/agents/custom-ids/import`;
- Errors returned from the API should be shown to the users;

##### Estimation: 7 points
##### Role: Frontend Engineer
##### Depends on: 1124