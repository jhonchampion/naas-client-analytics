# NAAS Assessment Scoring Model

## Executive Summary
This scoring model was designed to automate the assessment of NGO respondents for NAAS. It converts survey responses into standardized scores that feed into a readiness index, helping the company prioritize organizations for consultation. The model reduces manual review time, eliminates human bias, and allows handling more respondents without additional staff.

---

## 1. Model Overview
The assessment model maps structured survey responses to numeric scores, which are then aggregated to generate:

- **Domain-level scores**: Legal, Funding, Operations, Projects, Visibility  
- **Composite readiness index**: Determines readiness for a 1-on-1 consultation  
- **Recommendation tiers**: Early Stage → Developing → Growth Ready → Consultation Qualified  

---

## 2. Scoring Framework

### Legal & Administration
| Indicator      | Response | Score |
|----------------|---------|-------|
| Registration   | Yes     | 15    |
| Registration   | No      | 0     |
| Board          | Yes     | 10    |
| Board          | No      | 0     |

> **Rationale:** Formal registration and board presence indicate structural maturity.

### Funding & Grants
| Indicator        | Response        | Score |
|-----------------|----------------|-------|
| Grant History    | Yes            | 15    |
| Grant History    | No             | 0     |
| Grant Amount     | None           | 0     |
| Grant Amount     | Less than ₦1m  | 5     |
| Grant Amount     | ₦1m - ₦5m      | 10    |
| Grant Amount     | ₦5m - ₦10m     | 15    |
| Grant Amount     | ₦10m - ₦20m    | 20    |
| Grant Amount     | Above ₦20m     | 25    |
| Income Main      | Donations      | 15    |
| Income Main      | Grants         | 5     |
| Income Main      | Sponsorships/Partnerships | 15 |

> **Rationale:** Financial history and grant exposure indicate operational capacity and fund management experience.

### Staffing & Operations
| Indicator   | Response         | Score |
|------------|-----------------|-------|
| Projects   | None             | 0     |
| Projects   | 1–2              | 10    |
| Projects   | 3–5              | 15    |
| Projects   | More than 5      | 20    |
| Monitoring & Evaluation (MnR) | Yes | 15 |
| Monitoring & Evaluation (MnR) | No  | 0  |
| Staff Count | 0–3              | 0     |
| Staff Count | 4–10             | 10    |
| Staff Count | More than 10     | 30    |

> **Rationale:** Projects, staffing, and monitoring systems indicate the organization’s implementation readiness.

### Project Design
| Indicator | Response         | Score |
|-----------|-----------------|-------|
| Inflow    | Less than ₦1m    | 5     |
| Inflow    | ₦1m – ₦5m        | 10    |
| Inflow    | ₦5m – ₦10m       | 15    |
| Inflow    | ₦10m – ₦20m      | 20    |
| Inflow    | Above ₦20m       | 25    |
| Expenses  | Less than ₦500k  | 25    |
| Expenses  | ₦500k – ₦1m      | 20    |
| Expenses  | ₦1m – ₦5m        | 15    |
| Expenses  | ₦5m – ₦10m       | 10    |
| Expenses  | ₦10m – ₦20m      | 5     |
| Expenses  | Above ₦20m       | 0     |

> **Rationale:** Rewards high inflows and low operational costs for sustainability.

### Visibility & Presence
| Indicator | Response | Score |
|-----------|---------|-------|
| Presence  | Yes     | 30    |
| Presence  | No      | 10    |

> **Rationale:** Public visibility enhances credibility and partnership readiness.

---

### 3. How Scores and Recommendations Are Calculated
	
  1.	Area Scoring
  Each organization is evaluated across five key areas:
	•	Legal & Administration
	•	Funding & Grants
	•	Staffing & Operations
	•	Project Design
	•	Visibility & Media
  Each area has a maximum possible score (e.g., Legal = 25, Funding = 80). Individual responses from the form are scored according to the predefined scoring model.
	
  2.	Percent & Status Calculation
	•	For each area, the score is converted into a percentage of the maximum.
	•	Each percentage is mapped to a status:
	•	≥ 70% → Sustainable
	•	34–69% → Needs Support
	•	≤ 33% → Requires Attention
	
  3.	Overall Score
	•	The total score is the sum of all five area scores.
	•	The overall percentage is the total score divided by the sum of maximum scores for all areas.
	•	The overall percentage also maps to the same status categories.
	
  4.	Key Issue & Recommendation
	•	The area with the lowest percentage is flagged as the organization’s biggest challenge.
	•	Recommendations are generated based on this area, guiding the organization to specific NAAS services that address their most critical gaps.

---
## 4. Automation Key Mapping

Each survey response is assigned a structured key for automated processing in Google Sheets and Apps Script:

This structure allows:

- Programmatic parsing of survey responses  
- Dynamic score computation  
- Personalized report generation  
- Recommendation of appropriate NAAS services  

---

## 5. Modeling Philosophy
The scoring model reflects the following assumptions:

1. **Institutional structure correlates with sustainability**  
2. **Financial history predicts funding readiness**  
3. **Operational scale indicates implementation capacity**  

Weights were designed to prioritize indicators most predictive of whether the respondent should progress to a consultation call.
