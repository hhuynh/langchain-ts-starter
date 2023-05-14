export enum OPENAI_MODEL {
    GPT_3_5_TURBO = "gpt-3.5-turbo",
    TEXT_DAVINCI_003 = "text-davinci-003",
    CODE_DAVINCI_002 = "code-davinci-002",
    GPT_4 = "gpt-4",
    EMBEDDING_ADA_002 = "text-embedding-ada-002"
}

export enum DOC_NAME {
    NhomThichDuThu = "nhomthichduthu",
    CritterLogistics = "critter-logistics",
    MentalHealthWorkplace = "mental-health-workplace",
    HoneycodeApi = "honeycode-api",
}

export enum DOC_TYPE {
    TEXT,
    PDF
}

export interface TargetDoc {
    docName: DOC_NAME,
    docPath: string
    docType: DOC_TYPE;
}

export const NhomThichDuThuDoc: TargetDoc = {
    docName: DOC_NAME.NhomThichDuThu,
    docPath: `docs/${DOC_NAME.NhomThichDuThu}/messages.txt`,
    docType: DOC_TYPE.TEXT,
};

export const CritterLogisticsDoc: TargetDoc = {
    docName: DOC_NAME.CritterLogistics,
    docPath: `docs/${DOC_NAME.CritterLogistics}/critter-logistics.txt`,
    docType: DOC_TYPE.TEXT,
};

export const MentalHealthWorkplaceDoc: TargetDoc = {
    docName: DOC_NAME.MentalHealthWorkplace,
    docPath: `docs/${DOC_NAME.MentalHealthWorkplace}/Organizational_Best_Practices_Supporting_Mental-Health-in-the-Workplace-1.pdf`,
    docType: DOC_TYPE.PDF,
};

export const HoneycodeApiDoc: TargetDoc = {
    docName: DOC_NAME.HoneycodeApi,
    docPath: `docs/${DOC_NAME.HoneycodeApi}/honeycode-api.pdf`,
    docType: DOC_TYPE.PDF,
};
