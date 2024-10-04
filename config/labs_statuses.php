<?php

return [
    'statuses' => [
        'in_progress' => [
            'id' => 1,
            'title' => 'IN PROGRESS',
            'label' => 'Orders Sent',
            'active_tab' => true,

        ],
        'ready' => [
            'id' => 2,
            'title' => 'READY',
            'label' => 'Orders Processed',
            'active_tab' => true,

        ],
        'sent_to_labs' => [
            'id' => 3,
            'title' => 'SENT TO LABS',
            'label' => 'Sent to Labs',
            'active_tab' => false,

        ],
        'partial' => [
            'id' => 4,
            'title' => 'PARTIAL',
            'label' => 'Partial',
            'active_tab' => false,

        ],
    ]
];