import { useMemo, useState } from "react";
import { BriefcaseBusiness, GitBranchPlus, Save } from "lucide-react";

import { createContractPipeline } from "../api/hrApi.js";
import HrModuleShell from "../components/HrModuleShell.jsx";
import { useHrBootstrap } from "../hooks/useHrBootstrap.js";
import { findById, statusLabel } from "../utils/hrFormat.js";

const emptyPipeline = {
  name: "",
  roleId: "",
  employmentType: "CONTRACT",
  contractBehavior: "6_MONTH_THEN_PERMANENT",
  description: "",
  stageOne: "Contract Started",
  stageTwo: "3 Month Review",
  stageThree: "Permanent Decision",
  stageTwoDuration: "3",
  stageThreeDuration: "3",
};

function localPipeline(form, settings) {
  const role = findById(settings.jobRoles ?? [], form.roleId);
  return {
    id: crypto.randomUUID(),
    name: form.name,
    roleId: form.roleId,
    roleName: role?.title,
    employmentType: form.employmentType,
    contractBehavior: form.contractBehavior,
    description: form.description,
    employeeCount: 0,
    active: true,
    stages: [
      { id: crypto.randomUUID(), stageOrder: 1, name: form.stageOne, durationMonths: 0, approvalRequired: false, targetStatus: "ACTIVE" },
      { id: crypto.randomUUID(), stageOrder: 2, name: form.stageTwo, durationMonths: Number(form.stageTwoDuration || 0), approvalRequired: true, targetStatus: "UNDER_REVIEW" },
      { id: crypto.randomUUID(), stageOrder: 3, name: form.stageThree, durationMonths: Number(form.stageThreeDuration || 0), approvalRequired: true, targetStatus: "PERMANENT_DECISION" },
    ],
  };
}

export default function ContractPipelinesPage({ onModuleChange, onOpenSubModule }) {
  const { data, setData } = useHrBootstrap();
  const settings = data.settings ?? {};
  const pipelines = data.contractPipelines ?? [];
  const employees = data.employees ?? [];
  const [selectedPipelineId, setSelectedPipelineId] = useState(pipelines[0]?.id);
  const [form, setForm] = useState(emptyPipeline);

  const selectedPipeline = useMemo(
    () => pipelines.find((pipeline) => pipeline.id === selectedPipelineId) ?? pipelines[0],
    [pipelines, selectedPipelineId]
  );

  const pipelineEmployees = employees.filter(
    (employee) => employee.contractPipelineId === selectedPipeline?.id
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function savePipeline(event) {
    event.preventDefault();

    const payload = {
      name: form.name,
      roleId: form.roleId || null,
      employmentType: form.employmentType,
      contractBehavior: form.contractBehavior,
      description: form.description,
      stages: [
        { name: form.stageOne, durationMonths: 0, approvalRequired: false, targetStatus: "ACTIVE" },
        { name: form.stageTwo, durationMonths: Number(form.stageTwoDuration || 0), approvalRequired: true, targetStatus: "UNDER_REVIEW" },
        { name: form.stageThree, durationMonths: Number(form.stageThreeDuration || 0), approvalRequired: true, targetStatus: "PERMANENT_DECISION" },
      ],
    };

    try {
      const pipeline = await createContractPipeline(payload);
      setData((previous) => ({
        ...previous,
        contractPipelines: [...(previous.contractPipelines ?? []), pipeline],
        settings: {
          ...(previous.settings ?? {}),
          contractPipelines: [...(previous.settings?.contractPipelines ?? []), pipeline],
        },
      }));
      setSelectedPipelineId(pipeline.id);
    } catch {
      const pipeline = localPipeline(form, settings);
      setData((previous) => ({
        ...previous,
        contractPipelines: [...(previous.contractPipelines ?? []), pipeline],
        settings: {
          ...(previous.settings ?? {}),
          contractPipelines: [...(previous.settings?.contractPipelines ?? []), pipeline],
        },
      }));
      setSelectedPipelineId(pipeline.id);
    } finally {
      setForm(emptyPipeline);
    }
  }

  return (
    <HrModuleShell
      description="The pipeline itself is the job track. Create a named role-based path, assign employees to it, then monitor their stage progress and pending review points."
      onModuleChange={onModuleChange}
      onOpenSubModule={onOpenSubModule}
      sectionId="contract-pipelines"
      title="Pipelines"
    >

        <div className="contract-layout">
          <section className="contract-library-panel">
            <div className="hr-panel-header">
              <div>
                <p className="eyebrow">Pipelines</p>
                <h3>Job tracks</h3>
              </div>
              <BriefcaseBusiness size={22} />
            </div>

            <div className="pipeline-list">
              {pipelines.map((pipeline) => (
                <button
                  className={`pipeline-row ${selectedPipeline?.id === pipeline.id ? "selected" : ""}`}
                  key={pipeline.id}
                  onClick={() => setSelectedPipelineId(pipeline.id)}
                  type="button"
                >
                  <span className="hr-category-icon orange"><GitBranchPlus size={18} /></span>
                  <span>
                    <strong>{pipeline.name}</strong>
                    <small>{pipeline.roleName ?? "Any role"} - {statusLabel(pipeline.contractBehavior)}</small>
                  </span>
                  <span className="employee-count-pill">
                    {pipeline.employeeCount ?? employees.filter((employee) => employee.contractPipelineId === pipeline.id).length}
                  </span>
                </button>
              ))}
            </div>

            {selectedPipeline && (
              <div className="pipeline-stage-track">
                {selectedPipeline.stages?.map((stage) => (
                  <article key={stage.id}>
                    <span>{stage.stageOrder}</span>
                    <strong>{stage.name}</strong>
                    <small>{stage.approvalRequired ? "Approval required" : "No approval"} - {stage.durationMonths ?? 0} months</small>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="contract-detail-panel">
            <div className="hr-panel-header">
              <div>
                <p className="eyebrow">Employees In Track</p>
                <h3>{selectedPipeline?.name ?? "Select a pipeline"}</h3>
              </div>
            </div>

            <div className="employee-table-scroll compact-space">
              <table className="employee-table compact">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Role</th>
                    <th>Stage</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pipelineEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.fullName}</td>
                      <td>{employee.jobRoleName}</td>
                      <td>{employee.currentPipelineStageName}</td>
                      <td><span className="record-status success">{employee.status}</span></td>
                    </tr>
                  ))}
                  {pipelineEmployees.length === 0 && (
                    <tr>
                      <td colSpan="4">No employees assigned yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <form className="hr-form-grid single-column pipeline-form" onSubmit={savePipeline}>
              <div className="hr-panel-header no-margin">
                <div>
                  <p className="eyebrow">New Pipeline</p>
                  <h3>Create pipeline-as-job</h3>
                </div>
              </div>

              <label className="hr-form-field full-span">
                <span>Pipeline Name</span>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Support Agent - 3 Month to Permanent" required />
              </label>
              <label className="hr-form-field">
                <span>Role</span>
                <select name="roleId" value={form.roleId} onChange={handleChange}>
                  <option value="">Any role</option>
                  {(settings.jobRoles ?? []).map((role) => (
                    <option key={role.id} value={role.id}>{role.title}</option>
                  ))}
                </select>
              </label>
              <label className="hr-form-field">
                <span>Employment Type</span>
                <select name="employmentType" value={form.employmentType} onChange={handleChange}>
                  <option value="CONTRACT">Contract</option>
                  <option value="PERMANENT">Permanent</option>
                  <option value="INTERN">Intern</option>
                  <option value="TEMPORARY">Temporary</option>
                </select>
              </label>
              <label className="hr-form-field">
                <span>Behaviour</span>
                <select name="contractBehavior" value={form.contractBehavior} onChange={handleChange}>
                  <option value="3_MONTH_THEN_PERMANENT">3 month then permanent</option>
                  <option value="6_MONTH_THEN_PERMANENT">6 month then permanent</option>
                  <option value="DIRECT_PERMANENT">Direct permanent</option>
                  <option value="CUSTOM">Custom</option>
                </select>
              </label>
              <label className="hr-form-field">
                <span>Stage 1</span>
                <input name="stageOne" value={form.stageOne} onChange={handleChange} />
              </label>
              <label className="hr-form-field">
                <span>Stage 2</span>
                <input name="stageTwo" value={form.stageTwo} onChange={handleChange} />
              </label>
              <label className="hr-form-field">
                <span>Stage 2 Months</span>
                <input name="stageTwoDuration" type="number" min="0" value={form.stageTwoDuration} onChange={handleChange} />
              </label>
              <label className="hr-form-field">
                <span>Stage 3</span>
                <input name="stageThree" value={form.stageThree} onChange={handleChange} />
              </label>
              <label className="hr-form-field">
                <span>Stage 3 Months</span>
                <input name="stageThreeDuration" type="number" min="0" value={form.stageThreeDuration} onChange={handleChange} />
              </label>
              <label className="hr-form-field full-span">
                <span>Description</span>
                <input name="description" value={form.description} onChange={handleChange} />
              </label>
              <button className="submit-employee-button" type="submit">
                <Save size={16} />
                Save Pipeline
              </button>
            </form>
          </section>
        </div>
    </HrModuleShell>
  );
}
