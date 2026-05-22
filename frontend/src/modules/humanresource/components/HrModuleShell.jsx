import SubModuleLayout from "../../../layouts/SubModuleLayout.jsx";
import HrWorkspaceFrame from "./HrWorkspaceFrame.jsx";

export default function HrModuleShell({
  actions,
  children,
  description,
  meta,
  onModuleChange,
  onOpenSubModule,
  sectionId,
  title,
}) {
  return (
    <SubModuleLayout title={title} onModuleChange={onModuleChange}>
      <HrWorkspaceFrame
        actions={actions}
        description={description}
        meta={meta}
        onModuleChange={onModuleChange}
        onOpenSubModule={onOpenSubModule}
        sectionId={sectionId}
        title={title}
      >
        {children}
      </HrWorkspaceFrame>
    </SubModuleLayout>
  );
}
