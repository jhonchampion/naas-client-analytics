# NAAS (NGO-As-A-Service) Client Intake Analytics

### Project Overview
Many small and mid-sized NGOs struggle to clearly understand their operational capacity, funding readiness, and growth gaps. As a result, support organizations often provide generic advice instead of targeted solutions.

This project was built to solve that problem.

I designed and automated a data-driven assessment engine that:

	•	Collects structured responses from NGOs
	•	Transforms qualitative inputs into quantitative scores
	•	Segments organizations by capacity level
	•	Automatically generates personalized analytical reports
	•	Recommends targeted solutions based on performance gaps

The entire system runs on Google Sheets + Apps Script automation, transforming a simple intake form into a scalable analytics and reporting pipeline.

The Business Problem
------

Manual assessment processes created three major issues:

	❌ No standardized evaluation framework
	❌ Time-consuming manual report writing
	❌ Generic recommendations not tailored to organizational needs

The goal was to build a lightweight, scalable system that:

	✅ Standardizes evaluation criteria
	✅ Automates scoring logic
	✅ Produces actionable, personalized feedback
	✅ Reduces turnaround time from hours to minutes


My Approach
------

I approached this like a data product — not just a spreadsheet.

1. Framework Design
	- Defined key operational questions & answers
	- Built weighted scoring models 
	- Designed a composite maturity index
	- Created segmentation tiers based on overall performance

   All scoring logic was implemented using structured spreadsheet formulas.

 2. Analytical Scoring Model
	Each respondent’s inputs were:
	- Normalized
	- Weighted
	- Combined into a final maturity score

	The system produces:
	- Overall capacity rating
	- Gap identification
	- Priority intervention areas

	This transformed qualitative survey data into measurable insights.

 3. Automation with Google Apps Script

	To eliminate manual work, I developed an Apps Script automation layer that:
	- Detects new responses
	- Calculates scoring outputs
	- Generates a personalized analytical report
	- Sends automated emails with:
		✔ Performance summary
		✔ Identified weaknesses
		✔ Strategic recommendations

	This converted the sheet into a fully automated assessment engine.

Sample Output
------
![](Images/Revenue_trend.png)

Each respondent receives:
	•	A personalized performance breakdown
	•	Clear identification of low-scoring domains
	•	Priority recommendations
	•	Suggested service alignment


