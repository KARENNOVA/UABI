export interface NewInspection {
    basic_information: IBasicinformation;
    occupation: IOccupation;
    physical_inspection: IPhysicalinspection;
    occupant: IOccupant;
    photografic_register: IPhotograficregister;
    real_estate?: any
  }

  export interface IPhotograficregister {
    facade: string;
    general: string[];
  }

  export interface IOccupant {
    names: any;
    surnames: any;
    document_type: string;
    document_number: number;
    phone_number: number;
    phone_number_ext: number;
    email: string;
    documentNumber?: string;
  }

  export interface IPhysicalinspection {
    observations: string;
    public_services: IPublicservice[];
    properties: IProperty[];
  }

  export interface IProperty {
    name: string;
    status_property: string;
    observation: string;
    photographic_evidence: string;
    image?: any
  }

  export interface IPublicservice {
    name: string;
    subscriber: number;
    accountant: number;
    status: number | string;
  }

  export interface IOccupation {
    tenure: string;
    use: string;
    ownership: string;
    contractual: string;
  }

  export interface IBasicinformation {
    differences: string;
    isAnEspecialCase: boolean;
    special_actions: string;
    report_pdf_id: string;
  }
