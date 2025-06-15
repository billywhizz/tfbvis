let regFilterParams = {
  filterOptions: ['Contains', 'Regex'],
  textCustomComparator: function (filter, value, filterText) {
    let query = filterText.toLowerCase();
    let source = value.toString().toLowerCase();
    if (filter == 'Contains') {
      return query && source.indexOf(query) >= 0;
    } else if (filter == "Regex") {
      try {
        return new RegExp(query).test(source);
      } catch {
        return false;
      }
    }
  }
};

let columnDefs = [
  {
    headerName: "Framework", field: "name",
    pinned: 'left', cellStyle: { textAlign: "left" },
    tooltipValueGetter: params => params.data.meta.display_name,
    filter: true, filterParams: regFilterParams
  },
  {
    headerName: "Meta", children: [
      {
        headerName: "Language", field: "meta.language", filter: true,
        filterParams: regFilterParams
      }
    ]
  },
  {
    headerName: "RPS/Thread", children: [
      {
        headerName: "% max RPS/Thread", field: "misc.rps_per_core",
        filter: false, sortable: false, colId: "percent_max_rate_bar",
        cellRenderer: 'percentBarCellRenderer', width: 200
      }
    ]
  },
  {
    headerName: "RPS (k/req)", children: [
      {
        headerName: "% max RPS", field: "rps.requests_per_sec",
        filter: false, sortable: false, colId: "percent_max_rps_bar",
        cellRenderer: 'percentBarCellRenderer', width: 200
      }
    ]
  },
  {
    headerName: "RPS/Thread", children: [
      {
        headerName: "Mean", field: "misc.rps_per_core",
        filter: 'agNumberColumnFilter', sort: 'desc', valueFormatter: rpsFormatter,
        filterParams: { resetButton: true }
      }
    ]
  },
  {
    headerName: "RPS (k/req)", children: [
      {
        headerName: "Megabytes read", field: "rps.megabytes_read",
        filter: 'agNumberColumnFilter', hide: true
      },
      {
        headerName: "Over seconds", field: "rps.over_seconds",
        filter: 'agNumberColumnFilter', hide: true
      },
      {
        headerName: "Request count", field: "rps.request_count",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: rpsFormatter
      },
      {
        headerName: "RPS total", field: "rps.requests_per_sec",
        filter: 'agNumberColumnFilter', valueFormatter: rpsFormatter,
        filterParams: { resetButton: true }
      },
      {
        headerName: "RPS max per thread", field: "rps.thread_rps_max",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: rpsFormatter
      },
      {
        headerName: "RPS mean per thread", field: "rps.thread_rps_mean",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: rpsFormatter
      },
      {
        headerName: "RPS stdev per thread", field: "rps.thread_rps_stdev",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: rpsFormatter
      },
      {
        headerName: "RPS stdev range per thread", field: "rps.thread_rps_stdev_range",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: percentFormatter
      },
      {
        headerName: "Transfer MB per sec", field: "rps.transfer_megabytes_per_sec",
        filter: 'agNumberColumnFilter', hide: true
      },
      {
        headerName: "% Non 2xx", field: "rps.non_2xx_percent",
        filter: 'agNumberColumnFilter', valueFormatter: non2xxFormatter
      },
      {
        headerName: "Socket Errors", field: "rps.socket_error_count",
        filter: 'agNumberColumnFilter', valueFormatter: errorCountFormatter
      },
    ]
  },
  {
    headerName: "Latency (ms)", children: [
      {
        headerName: "50%", field: "latency.lat50",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: latencyFormatter
      },
      {
        headerName: "75%", field: "latency.lat75",
        filter: 'agNumberColumnFilter', hide: false, valueFormatter: latencyFormatter
      },
      {
        headerName: "90%", field: "latency.lat90",
        filter: 'agNumberColumnFilter', hide: false, valueFormatter: latencyFormatter
      },
      {
        headerName: "99%", field: "latency.lat99",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: latencyFormatter
      },
      {
        headerName: "% mean 99%", field: "latency.lat99",
        filter: false, sortable: false, colId: "percent_mean_99_bar",
        cellRenderer: 'percentBarCellRenderer', width: 200
      },
      {
        headerName: "Max", field: "latency.thread_max",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: latencyFormatter
      },
      {
        headerName: "Mean", field: "latency.thread_mean",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: latencyFormatter
      },
      {
        headerName: "Stdev", field: "latency.thread_stdev",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: latencyFormatter
      },
      {
        headerName: "Stdev range", field: "latency.thread_stdev_range",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: percentFormatter
      },
      {
        headerName: "Connections", field: "connections", hide: true,
      }
    ]
  },
  {
    headerName: "Memory (MB)", children: [
      {
        headerName: "Max", field: "memory.max",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: memoryFormatter
      },
      {
        headerName: "Mean", field: "memory.mean",
        filter: 'agNumberColumnFilter', valueFormatter: memoryFormatter
      },
      {
        headerName: "% max mean", field: "memory.mean",
        filter: false, sortable: false, colId: "percent_max_mean_memory_bar",
        cellRenderer: 'percentBarCellRenderer', width: 200
      },
      {
        headerName: "Median", field: "memory.median",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: memoryFormatter
      },
      {
        headerName: "Stdev", field: "memory.stdev",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: memoryFormatter
      },
      {
        headerName: "Stdev range", field: "memory.stdev_range",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: percentFormatter
      }
    ]
  },
  {
    headerName: "CPU (system)", children: [
      {
        headerName: "Max", field: "sys.max",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: cpuFormatter
      },
      {
        headerName: "Mean", field: "sys.mean",
        filter: 'agNumberColumnFilter', valueFormatter: cpuFormatter
      },
      {
        headerName: "% max mean", field: "sys.mean",
        filter: false, sortable: false, colId: "percent_max_mean_sys_bar",
        cellRenderer: 'percentBarCellRenderer', width: 200
      },
      {
        headerName: "Median", field: "sys.median",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: cpuFormatter
      },
      {
        headerName: "Stdev", field: "sys.stdev",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: cpuFormatter
      },
      {
        headerName: "Stdev range", field: "sys.stdev_range",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: cpuFormatter
      },
      {
        headerName: "Threads", field: "threads", hide: true
      }
    ]
  },
  {
    headerName: "CPU (user)", children: [
      {
        headerName: "Max", field: "usr.max",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: cpuFormatter
      },
      {
        headerName: "Mean", field: "usr.mean",
        filter: 'agNumberColumnFilter', valueFormatter: cpuFormatter
      },
      {
        headerName: "% max mean", field: "usr.mean",
        filter: false, sortable: false, colId: "percent_max_mean_usr_bar",
        cellRenderer: 'percentBarCellRenderer', width: 200
      },
      {
        headerName: "Median", field: "usr.median",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: cpuFormatter
      },
      {
        headerName: "Stdev", field: "usr.stdev",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: cpuFormatter
      },
      {
        headerName: "Stdev range", field: "usr.stdev_range",
        filter: 'agNumberColumnFilter', hide: true, valueFormatter: cpuFormatter
      },
      {
        headerName: "Threads", field: "threads", hide: true
      }
    ]
  },
  {
    headerName: "CPU (total)", children: [
      {
        headerName: "Mean", field: "cpu.mean",
        filter: 'agNumberColumnFilter', valueFormatter: cpuFormatter
      }
    ]
  },
  {
    headerName: "Meta", children: [
      {
        headerName: "Platform", field: "meta.platform", filter: true,
        filterParams: regFilterParams,
        cellRenderer: params => {
          if (params.value.toLowerCase() == "none")
            return params.value;
          const query = new URLSearchParams({ q: `${params.value} stars:>10` });
          const github = `https://github.com/search?${query}`;
          return `<a href="${github}">${params.value}</a>`;
        }
      },
      {
        headerName: "Webserver", field: "meta.webserver", filter: true,
        filterParams: regFilterParams
      },
      {
        headerName: "Classification", field: "meta.classification", filter: true,
        filterParams: regFilterParams
      },
      {
        headerName: "Database", field: "meta.database", filter: true,
        filterParams: regFilterParams
      },
      {
        headerName: "Orm", field: "meta.orm", filter: true,
        filterParams: regFilterParams
      },
      {
        headerName: "Framework", field: "meta.framework", hide: true, filter: true,
        filterParams: regFilterParams,
        cellRenderer: params => {
          if (params.value.toLowerCase() == "none")
            return params.value;
          const query = new URLSearchParams({
            q: `${params.value} language:${params.data.meta.language} stars:>10`,
            s: "stars"
          });
          const github = `https://github.com/search?${query}`;
          return `<a href="${github}">${params.value}</a>`;
        }
      },
      {
        headerName: "Display Name", field: "meta.display_name", filter: true, hide: true,
        filterParams: regFilterParams
      }
    ]
  }
];

let fTwoPoint = d3.format(",.2f");
let fOnePoint = d3.format(",.1f");
let fWhole = d3.format(",.0f");

function roundValue(value) {
  // round by one less than the number of digits
  const roundFactor = Math.pow(10, Math.round(Math.log10(value) - 1.0));
  return roundFactor * Math.round(value / roundFactor);
}

function memoryFormatter(params) {
  let v = params.value;
  return fWhole(v);
}

function rpsFormatter(params) {
  //let v = params.value / 1e3;
  const v = params.value;
  return (v < 10 ? fTwoPoint(v) : fWhole(v));
}

function non2xxFormatter(params) {
  if (params.value <= 0) return "";
  let v = params.value;
  return (v < 10 ? fOnePoint(v) : fWhole(v)) + "%";
}

function errorCountFormatter(params) {
  if (params.value <= 0) return "";
  return params.value;
}

function latencyFormatter(params) {
  let v = params.value;
  return fTwoPoint(v);
}

function cpuFormatter(params) {
  let v = params.value;
  return fOnePoint(v) + "%";
}

function percentFormatter(params) {
  return fWhole(params.value) + "%";
}

// cell renderer class
function PercentBarCellRenderer() { }
{
  // init method gets the details of the cell to be rendere
  PercentBarCellRenderer.prototype.init = function (params) {
    this.eGui = percentCellRenderer(params);
  };

  PercentBarCellRenderer.prototype.getGui = function () {
    return this.eGui;
  };

  let percentCellRenderer = function (params) {
    let value = params.value;

    let maxThing = 0;
    if (params.colDef.field.indexOf("rps.") === 0)
      maxThing = window.TFB_GRID.minMaxes.maxRps;
    else if (params.colDef.field.indexOf("latency.") === 0)
      maxThing = window.TFB_GRID.minMaxes.meanLat90;
    else if (params.colDef.field.indexOf("memory.") === 0)
      maxThing = window.TFB_GRID.minMaxes.maxMem;
    else if (params.colDef.field.indexOf("usr.") === 0)
      maxThing = window.TFB_GRID.minMaxes.maxUsr;
    else if (params.colDef.field.indexOf("sys.") === 0)
      maxThing = window.TFB_GRID.minMaxes.maxSys;
    else if (params.colDef.field.indexOf("misc.") === 0)
      maxThing = window.TFB_GRID.minMaxes.maxRate;

    let percent = maxThing <= 0 ? 0 : 100 * value / maxThing;
    let eDivPercentBarWrapper = document.createElement('div');
    eDivPercentBarWrapper.className = 'div-percent-bar-wrapper';
    let eDivPercentBar = document.createElement('div');

    eDivPercentBarWrapper.appendChild(eDivPercentBar);
    eDivPercentBar.className = "div-percent-bar";
    eDivPercentBar.style.width = (percent > 100 ? "100" : percent) + "%";
    eDivPercentBar.style.backgroundColor = Math.floor(percent) > 100
      ? "red" : (params.data.meta.color || "#cccccc");

    let eValue = document.createElement("div");
    eValue.className = "div-percent-value";
    eValue.innerHTML = fWhole(percent) + "%";
    if (percent > 85) {
      eValue.style["margin-left"] = "3%";
      eValue.style.color = "white";
      eValue.style["text-shadow"] = "black 1px 1px";
    } else if (percent > 70) {
      eValue.style["margin-left"] = (percent - 5) + "%";
    } else if (percent > 10) {
      eValue.style["margin-left"] = percent + "%";
    } else if (percent > 5) {
      eValue.style["margin-left"] = (percent + 2) + "%";
    } else {
      eValue.style["margin-left"] = (percent + 4) + "%";
    }

    let eOuterDiv = document.createElement("div");
    eOuterDiv.className = "div-outer-div";
    eOuterDiv.appendChild(eDivPercentBarWrapper);
    eOuterDiv.appendChild(eValue);

    return eOuterDiv;
  };
}

window.TFB_GRID = {
  gridOptions: {
    defaultColDef: {
      sortable: true,
      resizable: true,
      width: 100,
      cellStyle: { textAlign: "right" }
    },
    columnDefs: columnDefs,
    components: {
      'percentBarCellRenderer': PercentBarCellRenderer
    }
  },

  changeRun: function () {
    TFB_GRID.loadTable();
  },

  setUrlParams: function (testrun, testtype, round) {
    const url = new URL(window.location);
    url.searchParams.set("testrun", testrun);
    url.searchParams.set("testtype", testtype);
    url.searchParams.set("round", round ? "true" : "false");
    window.history.replaceState(null, null, "?" + url.searchParams.toString());
  },

  loadTable: async function () {
    let testrun = document.getElementById("testrun").value;
    let testtype = document.getElementById("testtype").value;
    let key = `data_${testrun}_${testtype}`;
    let colChecks = document.querySelectorAll(".column-check");
    for (let i = 0; i < colChecks.length; i++) {
      let colCheck = colChecks[i];
      let key = colCheck.getAttribute('data-key');
      if (!key) continue;
      TFB_GRID.gridOptions.columnApi.setColumnVisible(key, colCheck.checked);
    }

    let cached = TFB_GRID[key];
    if (cached) {
      let grid = TFB_GRID.gridOptions;
      //let sortState = grid.api.getSortModel();
      let filterState = grid.api.getFilterModel();
      TFB_GRID.minMaxes = calculateMinMaxes(cached);
      grid.api.setRowData(cached);
      grid.api.refreshCells();
      //grid.api.setSortModel(sortState);
      grid.api.setFilterModel(filterState);
      saveSettings()
      return;
    }

    // lookup from TechEmpower's tfb-lookup.js
    async function attachMeta(fetchedData) {
      let response = await fetch(`${testrun}/test_metadata.json`);
      let metadatas = await response.json();
      let metamap = {};
      for (let metadata of metadatas) {
        metamap[metadata.name] = metadata;
      }

      for (let i = 0; i < fetchedData.length; i++) {
        let fw = fetchedData[i];
        fw.meta = {};
        let meta = metamap[fw.name];
        if (meta) {
          fw.meta.language = meta.language;
          fw.meta.platform = meta.platform;
          fw.meta.webserver = meta.webserver;
          fw.meta.classification = meta.classification;
          fw.meta.database = meta.database;
          fw.meta.orm = meta.orm;
          fw.meta.framework = meta.framework;
          fw.meta.display_name = meta.display_name;
          fw.meta.color = getLanguageColor(meta.language);
        }
      }
    }

    function calculateMinMaxes(fetchedData) {
      let maxRps = 0, sumLat90 = 0, countLat90 = 0, maxMem = 0, maxSys = 0, maxUsr = 0, maxRate = 0;
      for (let i = 0; i < fetchedData.length; i++) {
        let fw = fetchedData[i];
        if (fw.rps.requests_per_sec > maxRps) maxRps = fw.rps.requests_per_sec;
        if (fw.memory.max > maxMem) maxMem = fw.memory.max;
        if (fw.usr.max > maxUsr) maxUsr = fw.usr.max;
        if (fw.sys.max > maxSys) maxSys = fw.sys.max;
        if (fw.latency.lat90 > 0) {
          countLat90 += 1;
          sumLat90 += fw.latency.lat90;
        }
        if (fw.misc.rps_per_core > maxRate) maxRate = fw.misc.rps_per_core;
      }

      return {
        maxRps: maxRps,
        meanLat90: sumLat90 / countLat90,
        maxMem: maxMem,
        maxSys: maxSys,
        maxUsr: maxUsr,
        maxRate: maxRate
      };
    }

    let response = await fetch(`${testrun}/${testtype}.json`);
    let fetchedData = await response.json();

    const frameworks = [
      'just',
      'redkale',
      'officefloor-async',
      'ffead-cpp-v-picov',
      'ffead-cpp-v-picov-raw-profiled',
      'ffead-cpp-postgresql-raw-profiled',
      'ffead-cpp-postgresql-raw-async-profiled-m',
      'drogon-core',
      'drogon',
      'actix',
      'gearbox',
      'greenlightning',
      'ffead-cpp-postgresql-raw-async-qw-pool-profiled-m',
      'faf',
      'appmpower-odbc-pg',
      'warp',
      'vertx-web-scala',
      'vertx-web-postgres',
      'inverno-postgres',
      'wizzardo-http',
      'officefloor-sqlclient',
      'salvo-pg',
      'axum-pg',
      'officefloor-rawsqlclient',
      'jooby-pgclient',
      'lithium-postgres-beta',
      'lithium',
      'lithium-postgres',
      'h2o',
      'axum-pg-pool',
      'aspcore-ado-pg',
      'aspcore-ado-pg-up',
      'xitca-web',
      'may-minihttp',
      'actix-http',
      'fastify',
      'spliffy',
      'fiber',
      'atreugo',
      'atreugo-prefork',
      'mrhttp',
      'pico.v',
      'libreactor',
      'uwebsockets.js',
      'silverlining',
    ]
    fetchedData = fetchedData.filter(v => {
      if (frameworks.indexOf(v.name) > -1) {
        v.misc = {
          rps_per_core: (v.rps.requests_per_sec) / (v.cpu.mean * v.threads / 100)
        }
        return true
      }
      return false
    })
    await attachMeta(fetchedData);
    TFB_GRID[key] = fetchedData;
    TFB_GRID.minMaxes = calculateMinMaxes(fetchedData);
    TFB_GRID.loadTable();
  }
};

function saveSettings() {
  const settings = Array.prototype.slice.apply(document.querySelectorAll('[data-key]')).map(v => ({ key: v.dataset.key, checked: v.checked }))
  localStorage.setItem('tfbvis.settings', JSON.stringify(settings))
}

function loadSettings() {
  const settings = JSON.parse(localStorage.getItem('tfbvis.settings') || '[]')
  for (const setting of settings) {
    const { key, checked } = setting
    document.querySelectorAll(`[data-key="${key}"]`)[0].checked = checked
  }
}

async function setLanguageColors() {
  let response = await fetch("language_colors.json");
  let colors = await response.json();

  window.LANGUAGE_COLORS = {};
  for (let [language, color] of Object.entries(colors)) {
    LANGUAGE_COLORS[language.toLowerCase()] = color;
  }

  window.getLanguageColor = lang => window.LANGUAGE_COLORS[lang.toLowerCase()];
}

document.addEventListener("DOMContentLoaded", async function () {
  let gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, TFB_GRID.gridOptions);
  await setLanguageColors();
  TFB_GRID.changeRun();

  function html(el, html) {
    let e = document.createElement(el);
    if (html) e.innerHTML = html;
    return e;
  }

  function appendColumnToggles(container, columns, filter) {
    for (let column of columns) {
      if (!filter(column)) {
        continue;
      }

      if (column.children) {
        const listHead = html("li", `${column.headerName}`);
        listHead.className = "column-check-head";

        const el = html("ul");
        el.className = "column-checks";
        el.appendChild(listHead);

        container.appendChild(el);
        appendColumnToggles(el, column.children, filter);
      } else {
        container.appendChild(html("li",
          `<input type="checkbox" class="column-check" data-key="${column.colId || column.field}" onchange="TFB_GRID.loadTable()" ${(column.hide ? "" : "checked")}>${column.headerName}</input>`
        ));
      }
    }
  }

  let checks = document.getElementById("columnChecksContainer");
  appendColumnToggles(checks, columnDefs, c => c.headerName != "Framework");
  loadSettings()
});
