import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private errors = [
    {
      code: 'MCOL',
      description: 'Missing Specimen or incomplete COLlection',
      example:
        'MCOL – Hepatitis serology testing requested but no blood collected',
    },
    {
      code: 'WSCO',
      description: 'Wrong Specimen COllected (Wrong container)',
      example:
        'WSCO - Von Willebrand Screen (VWS) requested but SST (Gold) collected',
    },
    {
      code: 'ETCO',
      description: 'Excessive Tubes Collected',
      example: 'ETCO – x3 EDTA tubes collected for Full Blood Count (FBC)',
    },
    {
      code: 'ISSC',
      description:
        'InSufficient Sample Collected (E.g. Citrate tube underfilled, DO NOT USE FOR DIFFICAULT BLEEDS)',
      example: 'ISSC – Citrate tube underfilled for INR',
    },
    {
      code: 'INSL',
      description: 'INcorrect Specimen or Request form Labelling (Mislabelled)',
      example:
        'INSL – Request for John Smith, specimen labelled for John Citizen.',
    },
    {
      code: 'L3ID',
      description: 'Less than 3 identifiers (Inadequately labelled)',
      example:
        'L3ID – Urine specimen only contained full name of patient. No DOB, sex or any other identifiers',
    },
    {
      code: 'UNLA',
      description: 'UNLAbelled Specimen (Unlabelled)',
      example: 'UNLA – Urine specimen received with no patient identification',
    },
    {
      code: 'DBCP',
      description: 'Duplicate BarCodes Printed from Eureka terminals',
      example: 'DBCP – Duplicate barcodes printed for patient John Citizen',
    },
    {
      code: 'BBNS',
      description:
        'Blood Bank request form or specimen Not Signed by collector',
      example: 'BBNS – Blood bank specimen not signed',
    },
    {
      code: 'UNSP',
      description: 'UNspun SPecimen',
      example: 'UNSP – SST received unspun',
    },
    {
      code: 'MHSP',
      description:
        'MisHandled SPecimen from point of collection (Not light protected, not aliquoted etc)',
      example:
        'MHSP – Vitamin A specimen not separated and frozen, not light protected',
    },
    {
      code: 'SPMU',
      description: 'SPecimens Mixed Up in different patient episode bag',
      example:
        'SPMU – Specimen for patient John Smith placed in specimen bag of Robyn Citizen',
    },
    {
      code: 'USRB',
      description: 'Urgent Specimen not Red Bagged',
      example: 'USRB – Urgent troponin not placed in red bag',
    },
    {
      code: 'USNN',
      description: 'Urgent Specimen Not Notified or escalated',
      example:
        'USNN – Urgent troponin received in SRA with routine courier and not notified',
    },
    {
      code: 'USTF',
      description: 'Urgent Specimen Tracking Form not used',
      example: 'USTF – Urgent tracking form not used for urgent Troponin',
    },
    {
      code: 'CSMP',
      description:
        'Collected Specimens MisPlaced (Inadequate or failure of handover to Medical Centre or Courier, not placed in night box)',
      example: 'CSMP – Specimens not placed in night box for pickup',
    },
    {
      code: 'LSPE',
      description:
        'Leaking SPEcimen (E.g. Urine/sputum/faeces/PCR tubes lips/caps not attached properly causing leakage and spoilage)',
      example:
        'LSPE – Urine leaking in specimen bag. SST EDTA and swab contaminated',
    },
    {
      code: 'SNSB',
      description: 'Specimen Not Separately Bagged (Urine/Faeces)',
      example: 'SNSB – Urine specimen not separately bagged',
    },
    {
      code: 'MREQ',
      description:
        'Missing REQuest form/to follow/recollection specimen without paperwork',
      example: 'MREQ – Request form not received with specimens',
    },
    {
      code: 'PDNV',
      description:
        'Patient Demographics Not Verified (E.g., Surname/Given/DOB/Sex/Mobile/Billing incorrect/missing/unclear on Request form and not corrected by collector via verification with the patient)',
      example:
        'PDNV – Request form printed with incorrect DOB: 30/07/1986, collector did not verify with patient/annotate on form correct DOB: 03/07/1986',
    },
    {
      code: 'RDNV',
      description:
        'Referring Doctor Not Verified (E.g., Referring Doctor Name/Address incomplete/missing/unclear on Request form)',
      example:
        'RDNV – Request form printed with no referring doctor, collector did not verify with patient/annotate on form referring doctor details',
    },
    {
      code: 'CTNV',
      description:
        'Copy To Not Verified (E.g., Copy To Name/Address incomplete/missing/unclear on Request form)',
      example:
        'CTNV – Request form printed with copy to doctor with no address, collector did not verify with patient/annotate on form copy doctor details',
    },
    {
      code: 'IOSFN',
      description:
        'Incorrect or missing Outstanding Specimen Form Notes recorded on outstanding specimen form (E.g., Incorrect, or missing Patient Details/Requesting Dr Details/Copy Dr Details/Outstanding Tests/Time of Collection/Date of Collection/Original Collection Date/Original Date of Request/Specimens Collected)',
      example:
        'IOSFN – Ambiguous annotation on request form which test require “TF”',
    },
    {
      code: 'ICNR',
      description:
        'Incorrect or missing medication, Collection information or clinical Notes on Request form (E.g., Thyroid medication, therapeutic drug dose and time, GTT times, difficult bleed, fasting/non-fasting status etc)',
      example:
        'ICNR – No information provided for Dexamethasone Suppression Test',
    },
    {
      code: 'EXRF',
      description: 'Use of EXpired Request Forms',
      example: 'EXRF – Original Dr request date back 3 years ago in 2020',
    },
    {
      code: 'MPTS',
      description: 'Missing PaTient Signature',
      example: 'MPTS – Patient signature missing on request form',
    },
    {
      code: 'ECGBI',
      description: 'ECG Barcode Issue',
      example:
        'ECGBI – 8 million barcode on request form already assigned to another patient',
    },
    {
      code: 'HQIE',
      description: 'Handwriting Question answered Incorrectly for Eorder',
      example:
        'HQIE – Collector incorrectly answered “N” to eOrder handwritten amendments on request form question via eOrder handset',
    },
    {
      code: 'ICEO',
      description: 'Incorrectly Cancelled E-Order',
      example:
        'ICEO - incorrectly cancelled E-Order, samples collected - Coll manager to retrain staff',
    },
    {
      code: 'EIUN',
      description: 'E-Order Incorrectly Uploaded to Non-E-Order',
      example:
        'EIUN - E-order request forms that have been photographed and uploaded to the non-E-Order queue in error',
    },
    {
      code: 'IPEO',
      description: 'Illegible Photo of E-Order Request Form',
      example:
        'IPEO - Photo of request form too blurry to complete handwritten amendments, waiting on scanned image from SRA to make amendments',
    },
    {
      code: 'SNPU',
      description: 'Specimens Not Picked Up',
      example: 'SNPU – Specimen left in night box not picked up',
    },
    {
      code: 'ISTT',
      description: 'Incorrect Specimens Transport Temperature',
      example: 'ISTT – Frozen specimen transported in 2-8°C',
    },
    {
      code: 'MREF',
      description: 'Missing Request Form',
      example: 'MREF - No request form',
    },
    {
      code: 'WFSI',
      description: 'Wrong Form Scanned In',
      example:
        'WFSI – Labels printed for the incorrect patient; request form scanned into Ultra do not match the lab number',
    },
    {
      code: 'WLNL',
      description:
        'Wrong Lab Number Labelled (E.g., Multiple lab numbers entered for the same patient from the same collection date, however SRA has not checked that their request form matches the request details in Ultra and prints the labels for the wrong lab number)',
      example:
        'WLNL – Labels printed for the wrong lab number for the same patient',
    },
    {
      code: 'MLNL',
      description:
        'Missed Lab Number for Labelling (E.g., Multiple lab numbers entered for the same patient from the same collection date, however SRA has repeatedly printed labels only for one lab number, and missed labelling other lab numbers)',
      example:
        'MLNL – 2 request forms entered by DE under separate lab numbers (forms in separate bag/split for billing). SRA has printed labels only for 1st lab number and missed the 2nd lab number',
    },
    {
      code: 'WPIDL',
      description: 'Wrong Patient Identified and Labelled',
      example:
        'WPIDL – Request form entered under the incorrect patient by DE “Smith, John – DOB: 13/07/1983”). SRA has searched and found the lab number for the incorrect patient and has continued printing labels for the incorrect patient, instead of cancelling the incorrect lab number and entering the form under the correct patient (“Smith, Joanna – DOB: 13/07/1983”)',
    },
    {
      code: 'ISTF',
      description:
        'Incorrect Specimen To Follow (E.g., Missing/Incorrect STF entered for the incorrect/missing tests and/or specimens to collect)',
      example:
        'ISTF – STF entered for the incorrect tests Hep B Serology, despite SST collected for testing',
    },
    {
      code: 'IREC',
      description:
        'Incorrect RECollection (E.g., Missing/Incorrect REC entered for the incorrect/missing tests and/or specimens to collect)',
      example:
        'IREC – REC entered for the incorrect tests Hep B Serology, despite SST collected',
    },
    {
      code: 'IATR',
      description:
        'Incorrect Addon Test(s) Request (E.g., Missing/Incorrect/Unstable ATR)',
      example:
        'IATR – Add on request form submitted by doctor. SRA has missed adding ENA that was requested on add on form',
    },
    {
      code: 'HMOE',
      description: 'Handwriting Missed Off Eorder',
      example: 'HMOE – Handwritten tests on request form missed',
    },
    // Add more errors as needed from the PDF.
  ];

  constructor() {}

  searchErrors(query: string): Observable<any[]> {
    const results = this.errors.filter(
      (error) =>
        error.code.toLowerCase().includes(query.toLowerCase()) ||
        error.description.toLowerCase().includes(query.toLowerCase())
    );
    return of(results);
  }
}
