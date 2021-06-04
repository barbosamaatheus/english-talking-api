import CreateDialog from "./CreateDialog";

export default interface ConsultDialog
{
  limit: number;
  page: number;
  where: {
    speech?: string;
    answer?: string;
  };
};