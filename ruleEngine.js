function handleEventTypeChange(whenIndex) {
  const eventTypeRadios = document.getElementsByName(`event-type-${whenIndex}`);
  const appStateOptions = document.getElementById(`app-state-options-${whenIndex}`);
  const whatfixCallbacksOptions = document.getElementById(`whatfix-callbacks-options-${whenIndex}`);
  const customEventOptions = document.getElementById(`custom-event-options-${whenIndex}`);
  const mutationOptions = document.getElementById(`mutation-options-${whenIndex}`);
  const repeatsForOptions = document.getElementById(`repeats-for-options-${whenIndex}`);
  const repeatForSelect = document.getElementById(`repeat-for-${whenIndex}`);
  const whatfixData1 = document.getElementById(`whatfix-data1-${whenIndex}`);
  const whatfixData2 = document.getElementById(`whatfix-data2-${whenIndex}`);
  const eventData1 = document.getElementById(`event-data1-${whenIndex}`);
  const eventData2 = document.getElementById(`event-data2-${whenIndex}`);

  if (eventTypeRadios[0].checked) {
    appStateOptions.classList.remove("hide");
    whatfixCallbacksOptions.classList.add("hide");
    whatfixData1.classList.add("hide");
    whatfixData2.classList.add("hide");
    customEventOptions.classList.add("hide");
    eventData1.classList.add("hide");
    eventData2.classList.add("hide");
  } else if (eventTypeRadios[1].checked) {
    appStateOptions.classList.add("hide");
    whatfixCallbacksOptions.classList.remove("hide");
    whatfixData1.classList.remove("hide");
    whatfixData2.classList.remove("hide");
    customEventOptions.classList.add("hide");
    eventData1.classList.add("hide");
    eventData2.classList.add("hide");
  } else if (eventTypeRadios[2].checked) {
    appStateOptions.classList.add("hide");
    whatfixCallbacksOptions.classList.add("hide");
    whatfixData1.classList.add("hide");
    whatfixData2.classList.add("hide");
    customEventOptions.classList.remove("hide");
    eventData1.classList.remove("hide");
    eventData2.classList.remove("hide");
    // Show/hide event data options based on selected filter
  } else {
    appStateOptions.classList.add("hide");
    whatfixCallbacksOptions.classList.add("hide");
    whatfixData1.classList.add("hide");
    whatfixData2.classList.add("hide");
    customEventOptions.classList.add("hide");
    eventData1.classList.add("hide");
    eventData2.classList.add("hide");
  }

  if (repeatForSelect.value === "mutation") {
    mutationOptions.classList.remove("hide");
    repeatsForOptions.classList.add("hide");
  } else if (repeatForSelect.value === "repeats-for") {
    mutationOptions.classList.add("hide");
    repeatsForOptions.classList.remove("hide");
  } else {
    mutationOptions.classList.add("hide");
    repeatsForOptions.classList.add("hide");
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
        <option value="role_tag">role tag</option>
        <option value="user_attr">user_attr</option>
        <option value="ent_attr">ent_attr</option>
      </select>

      <label for="where-operation-${whereIndex}">Operation:</label>
      <select id="where-operation-${whereIndex}">
        <option value="=">=</option>
        <option value="!=">!=</option>
        <option value="startsWith">startsWith</option>
        <option value="endsWith">endsWith</option>
        <option value="contains">contains</option>
        <option value="greaterThan">greater than</option>
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
  if (processorBlock.parentElement.childElementCount > 1) {
    processorBlock.remove();
  }
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
  addSequenceBtn.addEventListener("click", function(){
  	const sequencesContainer = document.querySelector(".sequences-container");
  const newSequenceBlock = document.createElement("div");
  newSequenceBlock.classList.add("sequence");

  newSequenceBlock.innerHTML = `
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
              <button class="remove-sequence-btn">Remove Sequence</button>
  `;

  sequencesContainer.insertBefore(newSequenceBlock, addSequenceBtn);
  });


  const addWhereBtn = document.getElementById("add-where-btn");
  addWhereBtn.addEventListener("click", addWhereBlock);

  let whenIndex = 0;
  const addWhenBtn = document.getElementById("add-when-btn");
  const whenContainer = document.getElementById("when-container");

    addWhenBtn.addEventListener("click", function () {
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
        <label>Delay:</label>
        <input type="number" id="delay-${whenIndex}" placeholder="Enter delay in seconds">
        <label>Repeat For:</label>
        <select class="repeat-for" id="repeat-for-${whenIndex}" onchange="handleEventTypeChange(${whenIndex})">
          <option value="">Select an option</option>
          <option value="mutation">Mutation</option>
          <option value="repeats-for">Repeats For</option>
        </select>
        <div class="mutation-options hide" id="mutation-options-${whenIndex}">
          <label>Time:</label>
          <input type="number" id="mutation-time-${whenIndex}" placeholder="Enter time in seconds">
        </div>
        <div class="repeats-for-options hide" id="repeats-for-options-${whenIndex}">
          <label>Times:</label>
          <input type="number" id="repeats-times-${whenIndex}" placeholder="Enter number of times">
          <label>For:</label>
          <input type="number" id="repeats-time-${whenIndex}" placeholder="Enter time in milliseconds">
        </div>
        <label>Filter:</label>
        <select id="filter-${whenIndex}">
          <option value="read-persist">Read from persist</option>
          <option value="local-storage">Local Storage</option>
          <option value="session-storage">Session Storage</option>
          <option value="cookie">Cookie</option>
          <option value="variable">Variable</option>
          <option value="element">Element</option>
        </select>
      </div>
            <div class="component whatfix-callbacks-options hide" id="whatfix-callbacks-options-${whenIndex}">
        <h4>Whatfix Callbacks</h4>
        <div class="component">
          <label>Content Type:</label>
          <select id="whatfix-content-type-${whenIndex}">
            <option value="">Select Content Type</option>
            <option value="flow">Flow</option>
            <option value="beacon">Beacon</option>
            <option value="popup">Popup</option>
            <option value="self-help">Self Help</option>
          </select>
        </div>
        <div class="component">
          <label>Event Type:</label>
          <select id="whatfix-event-type-${whenIndex}">
            <option value="">Select Event Type</option>
            <option value="before-start">Before Start</option>
            <option value="after-start">After Start</option>
            <option value="on-widget-open">On Widget Open</option>
            <!-- Add more options as needed -->
          </select>
        </div>
        <div class="component">
          <label>Choose Filter:</label>
          <select id="whatfix-filter-${whenIndex}">
            <option value="">Select Filter</option>
            <option value="read-persist">Read from persist</option>
            <option value="local-storage">Local Storage</option>
            <option value="session-storage">Session Storage</option>
            <option value="cookie">Cookie</option>
            <option value="variable">Variable</option>
            <option value="element">Element</option>
            <option value="flow-id">Flow ID</option>
            <option value="event">Event</option>
          </select>
        </div>
        <div class="component hide" id="whatfix-data1-${whenIndex}">
          <label>event.data1:</label>
          <input type="text" id="whatfix-data1-value-${whenIndex}" placeholder="Enter value">
        </div>
        <div class="component hide" id="whatfix-data2-${whenIndex}">
          <label>event.data2:</label>
          <input type="text" id="whatfix-data2-value-${whenIndex}" placeholder="Enter value">
        </div>
      </div>
      <div class="component custom-event-options hide" id="custom-event-options-${whenIndex}">
      <h4>Custom Event</h4>
      <div class="component">
        <label>Event Name:</label>
        <input type="text" id="event-name-${whenIndex}" placeholder="Enter event name">
      </div>
      <div class="component">
        <label>Choose Filter:</label>
        <select id="choose-filter-${whenIndex}" onchange="handleChooseFilterChange(${whenIndex})">
          <option value="">Select Filter</option>
          <option value="read-persist">Read from persist</option>
          <option value="local-storage">Local Storage</option>
          <option value="session-storage">Session Storage</option>
          <option value="cookie">Cookie</option>
          <option value="variable">Variable</option>
          <option value="element">Element</option>
          <option value="flow-id">Flow ID</option>
          <option value="event">Event</option>
        </select>
      </div>
      <div class="component hide" id="event-data1-${whenIndex}">
        <label>event.data1:</label>
        <input type="text" id="event-data1-value-${whenIndex}" placeholder="Enter value">
      </div>
      <div class="component hide" id="event-data2-${whenIndex}">
        <label>event.data2:</label>
        <input type="text" id="event-data2-value-${whenIndex}" placeholder="Enter value">
      </div>
    </div>
    `;
    whenContainer.appendChild(newWhenBlock);
    handleEventTypeChange(whenIndex);
    whenIndex++;
  });
});
