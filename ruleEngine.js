function handleEventTypeChange(whenIndex) {
  const eventTypeRadios = document.getElementsByName(`event-type-${whenIndex}`);
  const appStateOptions = document.getElementById(`app-state-options-${whenIndex}`);
  const whatfixCallbacksOptions = document.getElementById(`whatfix-callbacks-options-${whenIndex}`);
  const customEventOptions = document.getElementById(`custom-event-options-${whenIndex}`);

  if (eventTypeRadios[0].checked) {
    appStateOptions.classList.remove("hide");
    whatfixCallbacksOptions.classList.add("hide");
    customEventOptions.classList.add("hide");
  } else if (eventTypeRadios[1].checked) {
    appStateOptions.classList.add("hide");
    console.log("wow");
    whatfixCallbacksOptions.classList.remove("hide");
    customEventOptions.classList.add("hide");
  } else if (eventTypeRadios[2].checked) {
    appStateOptions.classList.add("hide");
    whatfixCallbacksOptions.classList.add("hide");
    customEventOptions.classList.remove("hide");
    // Show/hide event data options based on selected filter
  } else {
    appStateOptions.classList.add("hide");
    whatfixCallbacksOptions.classList.add("hide");
    customEventOptions.classList.add("hide");
  }
}


function handleAndOrChange(whenIndex) {
  const andOrSelect = document.getElementById(`and-or-${whenIndex}`);
  const andOrValue = andOrSelect.value;
  console.log(`AND/OR for WHEN ${whenIndex}:`, andOrValue);
}

function removeWhen(whenIndex) {
  const whenBlock = document.querySelector(`[data-when-index="${whenIndex}"]`);
  whenBlock.remove();
}

function addWhereBlock() {
  const whereContainer = document.getElementById("where-container");

  const newWhereBlock = document.createElement("div");
  newWhereBlock.classList.add("where-block");

  const whereIndex = whereContainer.children.length + 1;
  console.log(whereIndex);
  newWhereBlock.innerHTML = `
   <div id="where-block-${whereIndex}">
    <div class="component where-components">
      <label for="where-type-${whereIndex}">Type:</label>
      <select id="where-type-${whereIndex}">
                      <option value="">Select Where</option>
              <option value="url">url</option>
              <option value="path">path</option>
              <option value="query">query</option>
              <option value="page_tag">page tag</option>
              <option value="hash">hash</option>
      </select>

      <label for="where-operation-${whereIndex}">Operation:</label>
      <select id="where-operation-${whereIndex}">
        <option value="=">=</option>
              <option value="!=">!=</option>
              <option value="startsWith">startsWith</option>
              <option value="endsWith">endsWith</option>
              <option value="contains">contains</option>
              <option value="not contains">not contains</option>
      </select>

      <label for="where-value-${whereIndex}">Value:</label>
      <input type="text" id="where-value-${whereIndex}" placeholder="Enter value">
    </div>
    <div class="component">
      <select id="and-or">
        <option value="and">AND</option>
        <option value="or">OR</option>
      </select>
      <button id="add-where-btn" onclick="addWhereBlock()">+</button>
      <button class="remove-where-btn" onclick="removeWhere(${whereIndex})">-</button>
    </div>
    </div>
  `;

  whereContainer.appendChild(newWhereBlock);
}

function removeWhere(whereIndex) {
  console.log(whereIndex);
  const whereBlock = document.querySelector(`#where-block-${whereIndex}`);
  whereBlock.remove();
}

function addProcessorBlock(addBtn) {
  const processorBlock = addBtn.closest('.processors-component');
  const processorDropdown = processorBlock.querySelector('.processor-dropdown');
  const newProcessorBlock = processorDropdown.cloneNode(true);
  processorBlock.insertAdjacentElement('beforeend', newProcessorBlock);
}

function removeProcessorBlock(removeBtn) {
  const processorBlock = removeBtn.closest('.processor-dropdown');
  console.log(processorBlock.parentElement.childElementCount);
  if (processorBlock.parentElement.childElementCount > 2) {
    processorBlock.remove();
  }
}

function removeSequenceBlock(removeBtn) {
  const sequenceBlock = removeBtn.closest('.sequence');
  sequenceBlock.remove();
}

let filterCounts = {};
let filterCountsCustom = {};
let filterCountsWhatfix = {};

function addFilter(whenIndex) {
  const filterContainer = document.querySelector(`#filter-container-${whenIndex}`);

  // Get the current filter count for this whenIndex
  let filterIndex = filterCounts[whenIndex] || 2;

  // Create a new filter row
  const newFilterRow = document.createElement("div");
  newFilterRow.classList.add("filter-row");
  newFilterRow.innerHTML = `
        <div class="margin-right">
                		<label>Type</label>
                    <select class="filter-dropdown" id="filter-${filterIndex}-${whenIndex}">
                    <option value="select-filter-options">Select Filter Options</option>
                    <option value="read-persist">Read from persist</option>
                    <option value="local-storage">Local Storage (key would be asked)</option>
                    <option value="session-storage">Session Storage (key would be asked)</option>
                    <option value="cookie">Cookie (key would be asked)</option>
                    <option value="variable">Variable (variable name would be asked)</option>
                    <option value="element">Element (element definition would be asked)</option>
                </select>
                </div>
                <div class="margin-right">
                <label>Ops</label>
                <select class="filter-dropdown" id="filterOps-${filterIndex}-${whenIndex}">
                    <option value="select-operations">Select Appropriate Option</option>
                    <option value="exists">Exists</options>
                    <option value="not-exists">Not Exists</option>
                    <option value="contains">Contains</option>
                    <option value="not-contains">Not Contains</option>
                    <option value="equals">Equals</option>
                    <option value="not equals">Not Equals</option>
                    <option value="greater-then">Greater Then</option>
                    <option value="less-then">Less Then</option>
                </select>
                </div>
                <div class="margin-right">
                <label>Value</label>
                <input type="text" id="FilterValue-${filterIndex}-${whenIndex}" placeholder="Will change as per type and operations">
                </div>
            </div>
    `;

  // Append the new filter row to the filter container
  filterContainer.appendChild(newFilterRow);
  const newAndOrRow = document.createElement("div");
  newAndOrRow.classList.add("and-or-component");
  newAndOrRow.innerHTML = `<select class="and-or-dropdown" id="and-or-${filterIndex}-${whenIndex}">
  <option value="and">AND</option>
  <option value="or">OR</option>
</select>
<button class="add-filter-btn" onclick="addFilter(${whenIndex})">+</button>
<button class="remove-filter-btn" onclick="removeFilter(${filterIndex}, ${whenIndex})">-</button>`;
  
  filterContainer.appendChild(newAndOrRow);

  // Increment the filter count for this whenIndex
  filterCounts[whenIndex] = filterIndex + 1;
}

function removeFilter(filterIndex, whenIndex) {
  const filterRow = document.querySelector(`#filter-${filterIndex}-${whenIndex}`).parentElement.parentElement;
  filterRow.remove();
  const andOrDropdown = document.querySelector(`#and-or-${filterIndex}-${whenIndex}`);
  andOrDropdown.parentElement.remove();
}

function addFilterCustom(whenIndex) {
  const filterContainer = document.querySelector(`#filter-container-custom-${whenIndex}`);

  // Get the current filter count for this whenIndex
  let filterIndex = filterCountsCustom[whenIndex] || 2;

  // Create a new filter row
  const newFilterRow = document.createElement("div");
  newFilterRow.classList.add("filter-row");
  newFilterRow.innerHTML = `
        <div class="margin-right">
                		<label>Type</label>
                    <select class="filter-dropdown" id="filter-${filterIndex}-custom-${whenIndex}">
                    <option value="select-filter-options">Select Filter Options</option>
                    <option value="read-persist">Read from persist</option>
                    <option value="local-storage">Local Storage (key would be asked)</option>
                    <option value="session-storage">Session Storage (key would be asked)</option>
                    <option value="cookie">Cookie (key would be asked)</option>
                    <option value="variable">Variable (variable name would be asked)</option>
                    <option value="element">Element (element definition would be asked)</option>
                    <option value="event-data1">Event Data 1(key would be asked)</option>
                    <option value="event-data2">Event Data 2(key would be asked)</option>
                    <option value="event-data3">Event Data 3(key would be asked)</option>
                </select>
                </div>
                <div class="margin-right">
                <label>Ops</label>
                <select class="filter-dropdown" id="filterOps-${filterIndex}-custom-${whenIndex}">
                    <option value="select-filter-options">Select Appropriate Operation</option>
                    <option value="exists">Exists</options>
                    <option value="not-exists">Not Exists</option>
                    <option value="contains">Contains</option>
                    <option value="not-contains">Not Contains</option>
                    <option value="equals">Equals</option>
                    <option value="not equals">Not Equals</option>
                    <option value="greater-then">Greater Then</option>
                    <option value="less-then">Less Then</option>
                </select>
                </div>
                <div class="margin-right">
                <label>Value</label>
                <input type="text" id="FilterValue-${filterIndex}-custom-${whenIndex}" placeholder="Will change as per type and operations">
                </div>
    `;
   const newAndOrRow = document.createElement("div");
  newAndOrRow.classList.add("and-or-component");
  newAndOrRow.innerHTML = `<select class="and-or-dropdown" id="and-or-${filterIndex}-custom-${whenIndex}">
                        <option value="and">AND</option>
                        <option value="or">OR</option>
                    </select>
                    <button class="add-filter-btn" onclick="addFilterCustom(${whenIndex})">+</button>
                    <button class="remove-filter-btn" onclick="removeFilterCustom(${filterIndex}, ${whenIndex})">-</button>`;
  // Append the new filter row to the filter container
  filterContainer.appendChild(newFilterRow);
  filterContainer.appendChild(newAndOrRow);

  // Increment the filter count for this whenIndex
  filterCountsCustom[whenIndex] = filterIndex + 1;
}

function removeFilterCustom(filterIndex, whenIndex) {
  const filterRow = document.querySelector(`#filter-${filterIndex}-custom-${whenIndex}`).parentElement.parentElement;
  filterRow.remove();
  const andOrDropdown = document.querySelector(`#and-or-${filterIndex}-custom-${whenIndex}`);
  andOrDropdown.parentElement.remove();
}

function addFilterWhatfix(whenIndex) {
  const filterContainer = document.querySelector(`#filter-container-whatfix-${whenIndex}`);

  // Get the current filter count for this whenIndex
  let filterIndex = filterCountsWhatfix[whenIndex] || 2;

  // Create a new filter row
  const newFilterRow = document.createElement("div");
  newFilterRow.classList.add("filter-row");
  newFilterRow.innerHTML = `<div class="margin-right">
                		<label>Type</label>
                    <select class="filter-dropdown" id="filter-${filterIndex}-whatfix-${whenIndex}">
                    <option value="select-filter-options">Select Filter Options</option>
                    <option value="read-persist">Read from persist</option>
                    <option value="local-storage">Local Storage (key would be asked)</option>
                    <option value="session-storage">Session Storage (key would be asked)</option>
                    <option value="cookie">Cookie (key would be asked)</option>
                    <option value="variable">Variable (variable name would be asked)</option>
                    <option value="element">Element (element definition would be asked)</option>
                    <option value="flow-id">Flow Id</option>
                    <option value="step-id">Step No</option>
                    <option value="segment-name">Segment Name</option>
                </select>
                </div>
                <div class="margin-right">
                <label>Operations</label>
                <select class="filter-dropdown" id="filterOps-${filterIndex}-whatfix-${whenIndex}">
                    <option value="select-operations">Select Appropriate Option</option>
                    <option value="exists">Exists</options>
                    <option value="not-exists">Not Exists</option>
                    <option value="contains">Contains</option>
                    <option value="not-contains">Not Contains</option>
                    <option value="equals">Equals</option>
                    <option value="not equals">Not Equals</option>
                    <option value="greater-then">Greater Then</option>
                    <option value="less-then">Less Then</option>
                </select>
                </div>
                <div class="margin-right">
                <label>Value</label>
                <input type="text" id="FilterValue-${filterIndex}-whatfix-${whenIndex}" placeholder="Will change as per type and operations">
                </div>`;
    
    const newAndOrRow = document.createElement("div");
  newAndOrRow.classList.add("and-or-component");
  newAndOrRow.innerHTML = `<select class="and-or-dropdown" id="and-or-${filterIndex}-whatfix-${whenIndex}">
                        <option value="and">AND</option>
                        <option value="or">OR</option>
                    </select>
                    <button class="add-filter-btn" onclick="addFilterWhatfix(${whenIndex})">+</button>
                    <button class="remove-filter-btn" onclick="removeFilterWhatfix(${filterIndex}, ${whenIndex})">-</button>`;

  // Append the new filter row to the filter container
  filterContainer.appendChild(newFilterRow);
  filterContainer.appendChild(newAndOrRow);

  // Increment the filter count for this whenIndex
  filterCountsWhatfix[whenIndex] = filterIndex + 1;
}

function removeFilterWhatfix(filterIndex, whenIndex) {
  const filterRow = document.querySelector(`#filter-${filterIndex}-whatfix-${whenIndex}`).parentElement.parentElement;
  filterRow.remove();
  const andOrDropdown = document.querySelector(`#and-or-${filterIndex}-whatfix-${whenIndex}`);
  andOrDropdown.parentElement.remove();
}


document.addEventListener("DOMContentLoaded", function() {
  const tabs = document.querySelectorAll(".tabs li");
  const tabPanes = document.querySelectorAll(".tab-pane");
  const eventTypeRadios = document.querySelectorAll('input[name^="event-type"]');

  tabs.forEach((tab) => {
    tab.addEventListener("click", function() {
      const tabId = this.getAttribute("data-tab");
      tabs.forEach((tab) => tab.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));
      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  eventTypeRadios.forEach((radio) => {
    radio.addEventListener("change", function() {
      const whenIndex = this.getAttribute("data-when-index");
      handleEventTypeChange(whenIndex);
    });
  });

  const addSequenceBtn = document.querySelector(".add-sequence-btn");
  addSequenceBtn.addEventListener("click", function() {
    const sequencesContainer = document.querySelector(".sequences-container");
    const newSequenceBlock = document.createElement("div");
    newSequenceBlock.classList.add("sequence");

    newSequenceBlock.innerHTML = `
    <div class="component fetcher-component">
                <label for="fetcher">Fetcher:</label>
                <select class="fetcher">
                  <option value="">Select Fetcher</option>
                  <option value="element">Elements (Element definition will be asked)</option>
                  <option value="network-call">Network Call (Details will be asked)</option>
                  <option value="variable">Variable (variable name would be asked)</option>
                  <option value="local-storage">Local Storage (key would be asked)</option>
                  <option value="session-storage">Session Storage (key would be asked)</option>
                  <option value="function-invocation">Function Invocation to read value</option>
                  <option value="read-from-persist">Read from persist</option>
                </select>
              </div>
              <div class="processor-block">
                <div class="component processors-component">
                  <div class="processor-label-addition">
                  <label for="processor">Processor:</label>
                  <button class="add-processor-btn" onclick="addProcessorBlock(this)">+</button>
                  </div>
                  <div class="processor-dropdown">
                    <select class="processors">
                      <option value="">Select Processor</option>
                      <option value="read-attribute">Read Attribute (key would be asked)</option>
                      <option value="string-operation">String Operation (all String ops would be given)</option>
                      <option value="json-operation">JSON Operation (all json ops would be given)</option>
                      <option value="number-operation">Number Operation (all number ops would be given)</option>
                    </select>
                    <button class="remove-processor-btn" onclick="removeProcessorBlock(this)">-</button>
                  </div>
                </div>
              </div>
              <div class="component action-component">
                <label for="action">Action:</label>
                <select class="action">
                  <option value="">Select Action</option>
                  <option value="scroll-into-view">Scroll Into View</option>
                  <option value="event-propagation">Event Propagation</option>
                  <option value="_wfx_function-invocation">_wfx_function invocation</option>
                  <option value="_wfx_setting_customizer">_wfx_setting_customizer</option>
                  <option value="persist">Persist</option>
                  <option value="fire-custom-event">Fire Custom Event</option>
                  <option value="function-invocation">Function Invocation</option>
                  <option value="reuse"> Reuse </option>
                </select>
              </div>
              <button class="remove-sequence-btn" onclick="removeSequenceBlock(this)">Remove Sequence</button>
  `;

    sequencesContainer.insertBefore(newSequenceBlock, addSequenceBtn);
  });


  const addWhereBtn = document.getElementById("add-where-btn");
  addWhereBtn.addEventListener("click", addWhereBlock);

  let whenIndex = 0;
  const addWhenBtn = document.getElementById("add-when-btn");
  const whenContainer = document.getElementById("when-container");

  addWhenBtn.addEventListener("click", function() {
    const newWhenBlock = document.createElement("div");
    newWhenBlock.classList.add("when-block");
    newWhenBlock.setAttribute("data-when-index", whenIndex);
    newWhenBlock.innerHTML = `
      <h4>WHEN</h4>
      <button class="remove-when-btn" onclick="removeWhen(${whenIndex})">Remove WHEN</button>
      <div class="component">
        <label>Event Type:</label>
        <input type="radio" name="event-type-${whenIndex}" value="app-state" id="event-app-state-${whenIndex}" onchange="handleEventTypeChange(${whenIndex})">
        <label for="event-app-state-${whenIndex}">Application State</label>
        <input type="radio" name="event-type-${whenIndex}" value="whatfix-callbacks" id="event-whatfix-callbacks-${whenIndex}" onchange="handleEventTypeChange(${whenIndex})">
        <label for="event-whatfix-callbacks-${whenIndex}">Whatfix Callbacks</label>
        <input type="radio" name="event-type-${whenIndex}" value="custom-callbacks" id="event-custom-callbacks-${whenIndex}" onchange="handleEventTypeChange(${whenIndex})">
        <label for="event-custom-callbacks-${whenIndex}">Custom Event</label>
      </div>
      <div class="component app-state-options hide" id="app-state-options-${whenIndex}">
        <!-- Properties -->
        <div class="properties">
        	<div class="delay">
          <label>Delay:</label>
          <div class="increase-decrease">
            <input type="number" id="delay-${whenIndex}" placeholder="Enter delay in seconds">
          </div>
          </div>
          <div class="retry">
          <label>Retry:</label>
          <div class="increase-decrease">
            <input type="number" id="retry-times-${whenIndex}" placeholder="Times">
            <input type="number" id="retry-frequency-${whenIndex}" placeholder="Frequency">
          </div>
          </div>
        </div>
        <!-- Trigger Point -->
        <div class="trigger-point">
          <label>Trigger Point:</label>
          <div class="trigger-point-options">
          <select id="trigger-point-${whenIndex}">
          	<option value="select-scope">Select Scope</option>
            <option value="global">Global</option>
            <option value="element">Element (element definition would be asked)</option>
          </select>
          <select id="trigger-type-${whenIndex}">
          	<option value="select-trigger-action">Select Trigger Action</option>
            <option value="mutation">Mutation</option>
            <option value="event">Event (Event name would be taken separately)</option>
          </select>
          </div>
        </div>
        <!-- Filters -->
        <div class="filters">
            <label>Filters:</label>
            <div id="filter-container-${whenIndex}">
                <div class="filter-row">
                		<div class="margin-right">
                		<label>Type</label>
                    <select class="filter-dropdown" id="filter-1-${whenIndex}">
                    <option value="select-filter-options">Select Filter Options</option>
                    <option value="read-persist">Read from persist</option>
                    <option value="local-storage">Local Storage (key would be asked)</option>
                    <option value="session-storage">Session Storage (key would be asked)</option>
                    <option value="cookie">Cookie (key would be asked)</option>
                    <option value="variable">Variable (variable name would be asked)</option>
                    <option value="element">Element (element definition would be asked)</option>
                </select>
                </div>
                <div class="margin-right">
                <label>Operations</label>
                <select class="filter-dropdown" id="filterOps-1-${whenIndex}">
                    <option value="select-operations">Select Appropriate Option</option>
                    <option value="exists">Exists</options>
                    <option value="not-exists">Not Exists</option>
                    <option value="contains">Contains</option>
                    <option value="not-contains">Not Contains</option>
                    <option value="equals">Equals</option>
                    <option value="not equals">Not Equals</option>
                    <option value="greater-then">Greater Then</option>
                    <option value="less-then">Less Then</option>
                </select>
                </div>
                <div class="margin-right">
                <label>Value</label>
                <input type="text" id="FilterValue-1-${whenIndex}" placeholder="Will change as per type and operations">
                </div>
            </div>
                <div class="and-or-component">
                    <select class="and-or-dropdown" id="and-or-1-${whenIndex}">
                        <option value="and">AND</option>
                        <option value="or">OR</option>
                    </select>
                    <button class="add-filter-btn" onclick="addFilter(${whenIndex})">+</button>
                    <button class="remove-filter-btn" >-</button>
                </div>
            </div>
        </div>
      
  
      </div>
      <div class="component custom-event-options hide" id="custom-event-options-${whenIndex}">
        <!-- Properties -->
        <div class="properties">
          <label>Event Name:</label>
          <input type="text" id="event-name-${whenIndex}" placeholder="Enter event name">
        </div>
        <!-- Filters -->
        <div class="filters">
            <label>Filters:</label>
            <div id="filter-container-custom-${whenIndex}">
                <div class="filter-row">
                		<div class="margin-right">
                		<label>Type</label>
                    <select class="filter-dropdown" id="filter-1-custom-${whenIndex}">
                    <option value="select-filter-options">Select Filter Options</option>
                    <option value="read-persist">Read from persist</option>
                    <option value="local-storage">Local Storage (key would be asked)</option>
                    <option value="session-storage">Session Storage (key would be asked)</option>
                    <option value="cookie">Cookie (key would be asked)</option>
                    <option value="variable">Variable (variable name would be asked)</option>
                    <option value="element">Element (element definition would be asked)</option>
                    <option value="event-data1">Event Data 1(key would be asked)</option>
                    <option value="event-data2">Event Data 2(key would be asked)</option>
                    <option value="event-data3">Event Data 3(key would be asked)</option>
                </select>
                </div>
                <div class="margin-right">
                <label>Operations</label>
                <select class="filter-dropdown" id="filterOps-1-custom-${whenIndex}">
                    <option value="select-filter-options">Select Appropriate Operation</option>
                    <option value="exists">Exists</options>
                    <option value="not-exists">Not Exists</option>
                    <option value="contains">Contains</option>
                    <option value="not-contains">Not Contains</option>
                    <option value="equals">Equals</option>
                    <option value="not equals">Not Equals</option>
                    <option value="greater-then">Greater Then</option>
                    <option value="less-then">Less Then</option>
                </select>
                </div>
                <div class="margin-right">
                <label>Value</label>
                <input type="text" id="FilterValue-1-custom-${whenIndex}" placeholder="Will change as per type and operation">
                </div>
            </div>
                <div class="and-or-component">
                    <select class="and-or-dropdown" id="and-or-1-custom-${whenIndex}">
                        <option value="and">AND</option>
                        <option value="or">OR</option>
                    </select>
                    <button class="add-filter-btn" onclick="addFilterCustom(${whenIndex})">+</button>
                    <button class="remove-filter-btn" >-</button>
                </div>
            </div>
        </div>
      </div>
      <div class="component whatfix-callbacks-options hide" id="whatfix-callbacks-options-${whenIndex}">
        <!-- Properties -->
        <div class="properties">
          <label>Widget Type:</label>
          <select id="widget-type-${whenIndex}">
          	<option value="all-widget-list">All Widget Lists</option>
            <option value="flows">Flows</option>
            <option value="selfhelp">SelfHelp</option>
            <option value="tasklist">TaskList</option>
            <option value="popup">Popup</option>
            <option value="beacon">Beacon</option>
          </select>
        </div>
        <!-- Trigger Point -->
        <div class="trigger-point">
        	<div class="callbacks-dropdown">
          <label>Trigger Point:</label>
          <select id="trigger-type-${whenIndex}">
          	<option value="all-callback-of-widget">All callbacks listed</option>
            <option value="before-show">Before Show</option>
            <option value="on-close">On Close</option>
            <option value="on-open">On Open</option>
          </select>
          </div>
        </div>
        <!-- Filters -->
        <div class="filters">
            <label>Filters:</label>
            <div id="filter-container-whatfix-${whenIndex}">
                <div class="filter-row">
                		<div class="margin-right">
                		<label>Type</label>
                    <select class="filter-dropdown" id="filter-1-whatfix-${whenIndex}">
                    <option value="select-filter-options">Select Filter Options</option>
                    <option value="read-persist">Read from persist</option>
                    <option value="local-storage">Local Storage (key would be asked)</option>
                    <option value="session-storage">Session Storage (key would be asked)</option>
                    <option value="cookie">Cookie (key would be asked)</option>
                    <option value="variable">Variable (variable name would be asked)</option>
                    <option value="element">Element (element definition would be asked)</option>
                    <option value="flow-id">Flow Id</option>
                    <option value="step-id">Step No</option>
                    <option value="segment-name">Segment Name</option>
                </select>
                </div>
                <div class="margin-right">
                <label>Operations</label>
                <select class="filter-dropdown" id="filterOps-1-whatfix-${whenIndex}">
                    <option value="select-operations">Select Appropriate Option</option>
                    <option value="exists">Exists</options>
                    <option value="not-exists">Not Exists</option>
                    <option value="contains">Contains</option>
                    <option value="not-contains">Not Contains</option>
                    <option value="equals">Equals</option>
                    <option value="not equals">Not Equals</option>
                    <option value="greater-then">Greater Then</option>
                    <option value="less-then">Less Then</option>
                </select>
                </div>
                <div class="margin-right">
                <label>Value</label>
                <input type="text" id="FilterValue-1-whatfix-${whenIndex}" placeholder="Will change as per type and operations">
                </div>
            </div>
                <div class="and-or-component">
                    <select class="and-or-dropdown" id="and-or-1-whatfix-${whenIndex}">
                        <option value="and">AND</option>
                        <option value="or">OR</option>
                    </select>
                    <button class="add-filter-btn" onclick="addFilterWhatfix(${whenIndex})">+</button>
                    <button class="remove-filter-btn" >-</button>
                </div>
            </div>
        </div>
      </div>
    `;

    whenContainer.appendChild(newWhenBlock);

    whenIndex++;
  });
  
  const addRuleButton = document.querySelector(".add-rule-btn");
  const container = document.querySelector(".container");
  addRuleButton.addEventListener("click", function() {
  	const newRuleBlock = document.createElement("div");
    newRuleBlock.classList.add("rule-block-1");
    newRuleBlock.innerHTML = `
        <ul class="tabs">
        <li class="active" data-tab="where-tab">WHERE</li>
        <li data-tab="when-tab">WHEN</li>
        <li data-tab="what-tab">WHAT</li>
      </ul>
        <div class="tab-content">
        <div id="where-tab" class="tab-pane active">
          <h3>WHERE</h3>
          <div class="component where-components">
            <label for="where-type">Type:</label>
            <select id="where-type">
              <option value="">Select Where</option>
              <option value="url">url</option>
              <option value="path">path</option>
              <option value="query">query</option>
              <option value="page_tag">page tag</option>
              <option value="role_tag">role tag</option>
              <option value="user_attr">user_attr</option>
              <option value="ent_attr">ent_attr</option>
            </select>

            <label for="where-operation">Operation:</label>
            <select id="where-operation">
              <option value="=">=</option>
              <option value="!=">!=</option>
              <option value="startsWith">startsWith</option>
              <option value="endsWith">endsWith</option>
              <option value="contains">contains</option>
              <option value="greaterThan">greater than</option>
            </select>

            <label for="where-value">Value:</label>
            <input type="text" id="where-value" placeholder="Enter value">
          </div>
          <div class="component">
            <select id="and-or">
              <option value="and">AND</option>
              <option value="or">OR</option>
            </select>
            <button id="add-where-btn">+</button>
          </div>
          <div id="where-container"></div>
        </div>
        <div id="when-tab" class="tab-pane">
  <h3>WHEN</h3>
  <button id="add-when-btn">Add WHEN</button>
  <div id="when-container"></div>
</div>
        <div id="what-tab" class="tab-pane">
          <h3>WHAT</h3>
          <div class="sequences-container">
            <div class="sequence">
              <div class="component fetcher-component">
                <label for="fetcher">Fetcher:</label>
                <select class="fetcher">
                  <option value="">Select Fetcher</option>
                  <option value="element">Elements</option>
                  <option value="network-call">Network Call</option>
                  <option value="variable">Variable</option>
                  <option value="local-storage">Local Storage</option>
                  <option value="session-storage">Session Storage</option>
                  <option value="function-invocation">Function Invocation to read value</option>
                  <option value="read-from-persist">Read from persist</option>
                </select>
              </div>
              <div class="processor-block">
                <div class="component processors-component">
                  <div class="processor-label-addition">
                  <label for="processor">Processor:</label>
                  <button class="add-processor-btn" onclick="addProcessorBlock(this)">+</button>
                  </div>
                  <div class="processor-dropdown">
                    <select class="processors">
                      <option value="">Select Processor</option>
                      <option value="read-attribute">Read Attribute</option>
                      <option value="string-operation">String Operation</option>
                      <option value="json-operation">JSON Operation</option>
                      <option value="number-operation">Number Operation</option>
                    </select>
                    <button class="remove-processor-btn" onclick="removeProcessorBlock(this)">-</button>
                  </div>
                </div>
              </div>
              <div class="component action-component">
                <label for="action">Action:</label>
                <select class="action">
                  <option value="">Select Action</option>
                  <option value="scroll-into-view">Scroll Into View</option>
                  <option value="event-propagation">Event Propagation</option>
                  <option value="_wfx_function-invocation">_wfx_function invocation</option>
                  <option value="_wfx_setting_customizer">_wfx_setting_customizer</option>
                  <option value="persist">Persist</option>
                  <option value="fire-custom-event">Fire Custom Event</option>
                  <option value="function-invocation">Function Invocation</option>
                </select>
              </div>
              <button class="remove-sequence-btn" onclick="removeSequenceBlock(this)">Remove Sequence</button>
            </div>
            <button class="add-sequence-btn">Add Sequence +</button>
          </div>

        </div>
      </div>
        <button class="add-rule-btn">Add Rule+</button>
     `;
     container.appendChild(newRuleBlock);
  })
});
