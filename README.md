# NAAS (NGO-As-A-Service) Client Intake Analytics

Executive Summary
------

This project is an automated NGO capacity assessment engine built using Google Sheets and Google Apps Script.

The system operationalizes qualitative survey data into a structured, weighted scoring model that evaluates organizational readiness across multiple domains. Responses are normalized, aggregated into key problem area indices, and combined into a composite maturity score used for segmentation and qualification.

 Measurable Impact:
 
	•	Reduced report generation time by approximately 80%
	•	Eliminated an estimated 8–12 hours of manual review per week
	•	Scaled to handle over 1000 respondents per week
	•	Standardized evaluation criteria, removing subjective bias in qualification decisions
	•	Improved consultation efficiency through pre-call analytical reporting

The result is a lightweight decision-support system that integrates data modeling, automation, and reporting into a scalable operational workflow.

Project Overview
------
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
<img src= "Images/Recommendation.png" /> 

	- Defined key operational questions & answers
	- Built weighted scoring models 
	- Designed a composite maturity index
	- Created segmentation tiers based on overall performance

   All scoring logic was implemented using structured spreadsheet formulas.

 2. Analytical Scoring Model
<img src= "Images/Scoring_logic.png" /> 

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
<img src= "Images/App_Script.png" width="400" align="left" />

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
<img src= "Images/Mail.png" width="400" align="left" /> 

This image displays a customized NAAS Assessment Results email sent individually to clients.

✔  It outlines the organization’s performance across five core areas, using scores to determine whether each area is sustainable or requires additional support.
  
✔  Based on these results, tailored service recommendations are provided.

✔  At the bottom, a visual performance bar indicates the overall standing, positioned between “Needs Support” and “Sustainable.”

✔  The email also features a clear call-to-action button encouraging the recipient to schedule a free consultation.









