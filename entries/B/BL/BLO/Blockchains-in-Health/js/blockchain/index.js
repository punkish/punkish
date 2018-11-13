const vorpal = require('vorpal')();
const bc = require('./bc');

const initVorpal = function() {

    vorpal
        .command('list', 'Lists blockchain.')
        .action(function(args, callback) {
            this.log(JSON.stringify(bc, null, 4))
            callback();
        });

    vorpal
        .command('add', 'Add block to chain.')
        .option('-n, --name <name>', 'Name of person.')
        .types({
            string: ['n', 'name']
        })
        .option('-s, --systolic <systolic>', 'systolic BP of person.')
        .types({
            string: ['s', 'systolic']
        })
        .option('-d, --diastolic <diastolic>', 'diastolic BP of person.')
        .types({
            string: ['d', 'diastolic']
        })
        .action(function(args, callback) {
            bc.addBlock({ 
                name: args.options.name, 
                bloodpressure: {
                    systolic: args.options.systolic,
                    diastolic: args.options.diastolic
                }
            })

            callback();
        });

    vorpal
        .command('validate', 'validate blockchain.')
        .action(function(args, callback) {
            this.log('is chain valid? ' + bc.chainIsValid());
            callback();
        });

    vorpal
        .command('recompute', 'recompute blockchain.')
        .action(function(args, callback) {
            //this.log('is chain valid? ' + bc.chainIsValid());
            bc.recomputeChain();
            callback();
        });

    vorpal
        .delimiter('bc$')
        .show();
}

initVorpal();


// bplog.addBlock({name: "Bruce wayne", bp: "120/80"});
// bplog.addBlock({name: "Harrison wells", bp: "160/120"});
// bplog.addBlock({name: "Tony stark", bp: "110/90"});

//console.log(JSON.stringify(bplog, null, 4));

//console.log("Validity: ", bplog.chainIsValid());
//console.log(bplog.chain[0]);
//bplog.chain[2].data.bp = "170/110";
//console.log(bplog.chain[0]);
//console.log("Validity: ", bplog.chainIsValid());