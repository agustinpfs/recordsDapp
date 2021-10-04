App = {
    contracts: {},
    init: async () => {
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.render();
        await App.renderRecord();
    },
    loadWeb3: async () => {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            await window.ethereum.request({ method: "eth_requestAccounts" }); //me trae las cuentas desde la blockchain
        } else if (web3) {
            web3 = new Web3(window.web3.currentProvider);
        } else {
            console.log(
                "No ethereum browser is installed. Try it installing MetaMask "
            );
        }
    },
    loadAccount: async () => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        App.account = accounts[0];
    },
    loadContract: async () => {
        try {
            const res = await fetch("RecordContract.json");
            const recordsContractJSON = await res.json();
            console.log(recordsContractJSON, 'recordsContractJSON')
            App.contracts.RecordContract = TruffleContract(recordsContractJSON);// me trae el contrato 
            App.contracts.RecordContract.setProvider(App.web3Provider); //se conecta con metamask

            App.recordsContract = await App.contracts.RecordContract.deployed(); // tengo el contrato cargado (como en la consola de truffle)
        } catch (error) {
            console.error(error);
        }
    },
    render: async () => {
        document.getElementById("account").innerText = App.account;
    },
    renderRecord: async () => {
        const recordsCounter = await App.recordsContract.recordsCounter();
        const recordCounterNumber = recordsCounter.toNumber();

        let html = "";

        for (let i = 1; i <= recordCounterNumber; i++) {
            const record = await App.recordsContract.records(i);
            const recordId = record[0].toNumber();
            const recordTitle = record[1];
            const recordDescription = record[2];
            const recordDone = record[3];
            const recordCreatedAt = record[4];

            // Creating a record Card
            let recordElement = `<div class="card bg-dark rounded-0 mb-2">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span>${recordTitle}</span>
            <div class="form-check form-switch">
              <input class="form-check-input" data-id="${recordId}" type="checkbox" onchange="App.toggleDone(this)" ${recordDone === true && "checked"
                }>
            </div>
          </div>
          <div class="card-body">
            <span>${recordDescription}</span>
            <span>${recordDone}</span>
            <p class="text-muted">Record was created ${new Date(
                    recordCreatedAt * 1000
                ).toLocaleString()}</p>
            </label>
          </div>
        </div>`;
            html += recordElement;
        }

        document.querySelector("#recordsList").innerHTML = html;
    },
    createRecord: async (title, description) => {
        try {
            const result = await App.recordsContract.createRecord(title, description, {
                from: App.account,
            });
            console.log(result.logs[0].args);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    },
    toggleDone: async (element) => {
        const recordId = element.dataset.id;
        await App.recordsContract.toggleDone(recordId, {
            from: App.account,
        });
        window.location.reload();
    },
};

// App.init()