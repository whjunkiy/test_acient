<?php

namespace App\Exports;

use App\Queries\Leads\LeadsStatisticQuery;
use Illuminate\Http\Request;
use \Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;

class LeadsStatisticExport implements FromCollection
{
    protected $request;

    public function __construct($data = null)
    {
        $this->request = $data;
    }

    /**
     * @return Collection
     */
    public function collection(): Collection
    {
        $data = $this->request;
        $query = new LeadsStatisticQuery();
        $collection = [];
        $titles = ["First Name", "Last Name", "Profile Link", "Status", "State", "Provider", "Coordinator",
            "DateTime Created", "DateTime Assigned", "DateTime Registered", "DateTime 1st Changed Status",
            "DateTime 1st Callback", "DateTime Chart Note"
        ];
        if ($data['supply']) {
            $titles[] = "DateTime Last order";
            $titles[] = "Medication";
            $titles[] = "Days left";
            $titles[] = "Until date";
            $titles[] = "Order link";
        } else {
            $titles[] = "Lead Paid Sum";
        }
        $collection[] = $titles;
        foreach (['ny', 'la', 'miami', 'renew'] as $loc) {
            $locData = $query->getCsvStatistic($loc,
                $data['type_sales'], $data['datepicker1'], $data['datepicker2'],
                $data['timefrom'], $data['timeto'], $data['traffic'], $data['lead_source'] ?? 'all',
                $data['tcoordinator'], $data['supply'] == 1, $data['provider']);
            $collection = array_merge($collection, $locData);
        }

        return new Collection($collection);
    }
}
